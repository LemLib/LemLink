use clap::Parser as _;

#[derive(clap::Parser)]

struct TopLevelArgs {
    #[clap(subcommand)]
    command: Command,
}

#[derive(clap::Subcommand)]
enum ConductorSubcommand {
    CreateTemplate(CreateTemplateArgs),
}

#[derive(clap::Parser, Debug)]
#[command(hide = true)]
struct CreateTemplateArgs {
    #[arg()]
    path: String,
    #[arg()]
    name: String,
    #[arg()]
    version: String,
    #[clap(long)]
    system: Vec<String>,
    #[clap(long)]
    user: Vec<String>,
    #[clap(long, value_enum, value_name = "TARGET", num_args = 1 )]
    target: CreateTemplateTarget,
    #[clap(long, value_name = "KERNEL_VERSION")]
    kernels: Option<String>,
    #[clap(long, value_name = "PATH")]
    destination: Option<String>,
}

#[derive(clap::ValueEnum, Copy, Clone, Debug, PartialEq, Eq)]
enum CreateTemplateTarget {
    V5,
    Cortex,
}

#[derive(clap::Subcommand)]
#[command(infer_subcommands = true)]
enum Command {
    Conductor {
        #[clap(subcommand)]
        command: ConductorSubcommand,
    },

}

fn main() {
    let args = TopLevelArgs::parse();

    match args.command {
        Command::Conductor{command} => match command {
            ConductorSubcommand::CreateTemplate(template_args) => {
                println!("{:?}", template_args);
            }
        },
    }
}
