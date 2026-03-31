use soroban_sdk::{panic_with_error, Env, Vec};

use crate::errors::ContractError;
use crate::types::{Invoice, InvoiceKey};

const TTL_THRESHOLD: u32 = 100;
const TTL_BUMP: u32 = 1000;

fn bump_instance(env: &Env) {
    env.storage().instance().extend_ttl(TTL_THRESHOLD, TTL_BUMP);
}

pub fn has_invoice(env: &Env, id: u64) -> bool {
    env.storage().persistent().has(&InvoiceKey::Invoice(id))
}

pub fn read_invoice(env: &Env, id: u64) -> Invoice {
    bump_instance(env);
    env.storage()
        .persistent()
        .get(&InvoiceKey::Invoice(id))
        .unwrap_or_else(|| panic_with_error!(env, ContractError::InvoiceNotFound))
}

pub fn write_invoice(env: &Env, invoice: &Invoice) {
    bump_instance(env);
    env.storage()
        .persistent()
        .set(&InvoiceKey::Invoice(invoice.id), invoice);
}

pub fn push_invoice_id(env: &Env, id: u64) {
    let mut ids: Vec<u64> = env
        .storage()
        .persistent()
        .get(&InvoiceKey::Registry)
        .unwrap_or_else(|| Vec::new(env));
    ids.push_back(id);
    env.storage().persistent().set(&InvoiceKey::Registry, &ids);
}

pub fn read_invoice_ids(env: &Env) -> Vec<u64> {
    bump_instance(env);
    env.storage()
        .persistent()
        .get(&InvoiceKey::Registry)
        .unwrap_or_else(|| Vec::new(env))
}
