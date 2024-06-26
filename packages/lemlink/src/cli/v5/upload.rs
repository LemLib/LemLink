//! The upload Command!

use std::{fs, time::Duration};

use vex_v5_serial::{
    commands::file::{ProgramData, UploadProgram},
    connection::{serial, Connection, ConnectionError},
    packets::file::FileExitAtion,
};

/// Arguments for the upload command
#[derive(clap::Parser, Debug)]
#[command()]
pub struct UploadArgs {
    /// The path to the file cold_bin to be uploaded
    #[arg(long, num_args = 1, value_name = "PATH")]
    cold_bin: std::path::PathBuf,
    /// The name to be displayed on the V5 brain
    #[arg(long, num_args = 1, value_name = "NAME")]
    name: String,
    /// Action to do after uploading
    #[arg(long = "after", value_enum, default_value_t = DoAfterUpload::None)]
    do_after: DoAfterUpload,
    /// Program slot on the GUI. (1<=x<=8)
    #[arg(long, value_name = "INTEGER")]
    slot: Option<u8>,
    /// Icon for the program
    #[arg(long, value_name = "ICON")]
    icon: Option<String>,
    /// Description for the program
    #[arg(long, value_name = "DESCRIPTION")]
    description: Option<String>,
    /// Timeout for the connection in seconds
    #[arg(long, value_name = "SECONDS", default_value = "10")]
    timeout: u64,
    /// Compress the program before uploading
    #[arg(long, default_value_t = true)]
    compress: bool,
}

/// Action to do after uploading
#[derive(clap::ValueEnum, Copy, Clone, Debug, PartialEq, Eq)]
pub enum DoAfterUpload {
    /// Open the program screen after uploading
    Screen,
    /// Run the program after uploading
    Run,
    /// Don't do anything after uploading
    None,
    /// Halts previously running program
    Halt,
}

/// Uploads a program to the V5 brain
pub async fn upload(args: UploadArgs) -> Result<(), ConnectionError> {
    let devices = serial::find_devices()?;
    let mut connection = devices[0].connect(Duration::from_secs(args.timeout))?;
    let cold_bytes = fs::read(args.cold_bin).expect("Failed to read cold_bin");

    connection
        .execute_command(UploadProgram {
            name: args.name,
            description: args.description.unwrap_or("".to_string()),
            icon: args.icon.unwrap_or("USER029x.bmp".to_string()),
            program_type: "vexide".to_string(),
            slot: args.slot.unwrap_or(1),
            data: ProgramData::Cold(cold_bytes),
            compress_program: args.compress,
            after_upload: match args.do_after {
                DoAfterUpload::Screen => FileExitAtion::ShowRunScreen,
                DoAfterUpload::Run => FileExitAtion::RunProgram,
                DoAfterUpload::None => FileExitAtion::DoNothing,
                DoAfterUpload::Halt => FileExitAtion::Halt,
            },
        })
        .await?;

    Ok(())
}
