use soroban_sdk::contracterror;

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum ContractError {
    InvoiceNotFound = 1,
    InvoiceAlreadyExists = 2,
    InvoiceAlreadyFunded = 3,
    InvoiceNotFunded = 4,
    InvalidAmount = 5,
    InvalidRepayment = 6,
}
