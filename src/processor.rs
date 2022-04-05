use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
};

use crate::instruction::EchoInstruction;

pub mod echo;

pub struct Processor {}

impl Processor {
    pub fn process_instruction(
        _program_id: &Pubkey,
        accounts: &[AccountInfo],
        instruction_data: &[u8],
    ) -> ProgramResult {
        let instruction = EchoInstruction::try_from_slice(instruction_data)
            .map_err(|_| ProgramError::InvalidInstructionData)?;

        match instruction {
            EchoInstruction::Echo { data } => {

                msg!("Instruction: Echo");
                echo::process(_program_id, accounts, data)?;
                // //create an iterator to gpo through account info passed in
                // let accounts_iter = &mut accounts.iter();

                // //assign echo_buffer to an account
                // let echo_buffer = next_account_info(accounts_iter)?;

                // //borrow mutable reference to account's data
                // let buffer = &mut (*echo_buffer.data).borrow_mut();

                // //print data :
                // msg!("data_: {:?} ", data );

                

                // //check input:
                // if(buffer.len() == 0){
                //     msg!("Account has data length of 0. Failing. ");
                //     return Err(ProgramError::AccountDataTooSmall);
                // }

                // //get length of buffer and store in variable
                // let bytes_to_copy = buffer.len();

                // //copy over values from data passed in to the buffer
                // for index in  0..bytes_to_copy {
                //     buffer[index] = data[index];
                // }
                // msg!(
                //     "Successfully wrote {} bytes to account of size {}",
                //     bytes_to_copy,
                //     buffer.len()
                // );      
               
            }
            _ => {
                msg!("didn't match correctly"); 
            }
        }
        Ok(())
    }
}
