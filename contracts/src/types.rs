use soroban_sdk::{contracttype, Address, String};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum InvoiceStatus {
    Active,
    Funded,
    Repaid,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Invoice {
    pub id: u64,
    pub seller: Address,
    pub investor: Option<Address>,
    pub buyer_name: String,
    pub amount: i128,
    pub advance_amount: i128,
    pub repayment_amount: i128,
    pub due_date: u64,
    pub status: InvoiceStatus,
    pub metadata_uri: String,
}

#[contracttype]
#[derive(Clone)]
pub enum InvoiceKey {
    Invoice(u64),
    Registry,
}
