use borsh::{BorshDeserialize, BorshSerialize};

#[derive(Clone, Debug, BorshDeserialize, BorshSerialize)]
pub struct EchoBuffer {
    pub data: Vec<u8>,
}
#[derive(Clone, Debug, BorshDeserialize, BorshSerialize)]
pub struct AuthorizedBufferHeader {
    pub bump_seed: u8,
    pub buffer_seed: u64,
}

#[derive(Clone, Debug, BorshDeserialize, BorshSerialize)]
pub struct VendingMachineBufferHeader {
    pub bump_seed: u8,
    pub price: u64,
}
