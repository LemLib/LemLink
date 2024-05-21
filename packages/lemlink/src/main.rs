use clap::Parser as _;

#[derive(clap::Parser)]
struct Args {
    #[clap(subcommand)]
    command: Command,
}

#[derive(clap::Subcommand)]
enum Command {
    Example,
}

fn main() {
    let args = Args::parse();

    match args.command {
        Command::Example => {
            println!("Hello, world!");
        }
    }
}
