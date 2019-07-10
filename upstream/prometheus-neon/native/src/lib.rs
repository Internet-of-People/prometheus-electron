#[macro_use]
extern crate neon;
use neon::prelude::*;
use prometheusd::{init_logger, Daemon, Options, StructOpt};

pub struct PrometheusDaemon(Option<Daemon>);

impl PrometheusDaemon {
    pub fn new() -> Self {
        let options = Options::from_args();

        // This panic will just throw an exception in JS
        init_logger(&options).unwrap_or_else(|e| eprintln!("Could not initialize logger {}", e));

        let daemon = Daemon::start(options).expect("Could not start deamon");
        Self(Some(daemon))
    }

    pub fn done(&mut self) -> () {
        let d_opt = self.0.take();
        let mut d = d_opt.expect("This daemon was already done.");
        d.stop().expect("Could not send stop to daemon");
        d.join().expect("Error while closing daemon");
    }
}

declare_types! {
    pub class JsPrometheusDaemon for PrometheusDaemon {
        init(_cx) {
            Ok(PrometheusDaemon::new())
        }

        method done(mut cx) {
            let mut js_self = cx.this();
            cx.borrow_mut(&mut js_self, |mut this| {
                this.done();
            });
            Ok(cx.undefined().upcast())
        }
    }
}

register_module!(mut m, {
    m.export_class::<JsPrometheusDaemon>("PrometheusDaemon")?;
    Ok(())
});