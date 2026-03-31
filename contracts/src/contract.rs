use soroban_sdk::{contract, contractimpl, panic_with_error, Address, Env, String, Vec};

use crate::errors::ContractError;
use crate::storage::{has_invoice, push_invoice_id, read_invoice, read_invoice_ids, write_invoice};
use crate::types::{Invoice, InvoiceStatus};

#[contract]
pub struct InvoiceEscrowContract;

#[contractimpl]
impl InvoiceEscrowContract {
    pub fn create_invoice(
        env: Env,
        id: u64,
        seller: Address,
        buyer_name: String,
        amount: i128,
        advance_amount: i128,
        repayment_amount: i128,
        due_date: u64,
        metadata_uri: String,
    ) -> Invoice {
        seller.require_auth();

        if amount <= 0 || advance_amount <= 0 || repayment_amount < advance_amount {
            panic_with_error!(&env, ContractError::InvalidAmount);
        }

        if has_invoice(&env, id) {
            panic_with_error!(&env, ContractError::InvoiceAlreadyExists);
        }

        let invoice = Invoice {
            id,
            seller,
            investor: None,
            buyer_name,
            amount,
            advance_amount,
            repayment_amount,
            due_date,
            status: InvoiceStatus::Active,
            metadata_uri,
        };

        write_invoice(&env, &invoice);
        push_invoice_id(&env, id);
        invoice
    }

    pub fn fund_invoice(env: Env, id: u64, investor: Address) -> Invoice {
        investor.require_auth();
        let mut invoice = read_invoice(&env, id);

        if invoice.status != InvoiceStatus::Active {
            panic_with_error!(&env, ContractError::InvoiceAlreadyFunded);
        }

        invoice.investor = Some(investor);
        invoice.status = InvoiceStatus::Funded;
        write_invoice(&env, &invoice);
        invoice
    }

    pub fn repay_invoice(env: Env, id: u64, seller: Address, repayment_amount: i128) -> Invoice {
        seller.require_auth();
        let mut invoice = read_invoice(&env, id);

        if invoice.status != InvoiceStatus::Funded {
            panic_with_error!(&env, ContractError::InvoiceNotFunded);
        }

        if invoice.seller != seller {
            panic_with_error!(&env, ContractError::InvalidRepayment);
        }

        if repayment_amount < invoice.repayment_amount {
            panic_with_error!(&env, ContractError::InvalidRepayment);
        }

        invoice.status = InvoiceStatus::Repaid;
        write_invoice(&env, &invoice);
        invoice
    }

    pub fn get_invoice(env: Env, id: u64) -> Invoice {
        read_invoice(&env, id)
    }

    pub fn list_invoice_ids(env: Env) -> Vec<u64> {
        read_invoice_ids(&env)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use soroban_sdk::testutils::Address as _;
    use soroban_sdk::{vec, Env};

    #[test]
    fn create_fund_repay_flow() {
        let env = Env::default();
        env.mock_all_auths();
        let contract_id = env.register(InvoiceEscrowContract, ());
        let client = InvoiceEscrowContractClient::new(&env, &contract_id);

        let seller = Address::generate(&env);
        let investor = Address::generate(&env);

        let created = client.create_invoice(
            &1,
            &seller,
            &String::from_str(&env, "Acme Export Group"),
            &10_000,
            &8_500,
            &10_800,
            &1_750_000_000,
            &String::from_str(&env, "ipfs://invoice-1"),
        );

        assert_eq!(created.status, InvoiceStatus::Active);

        let funded = client.fund_invoice(&1, &investor);
        assert_eq!(funded.status, InvoiceStatus::Funded);

        let repaid = client.repay_invoice(&1, &seller, &10_800);
        assert_eq!(repaid.status, InvoiceStatus::Repaid);

        assert_eq!(client.list_invoice_ids(), vec![&env, 1]);
    }
}
