// Copyright © 2021 The Radicle Upstream Contributors
//
// This file is part of radicle-upstream, distributed under the GPLv3
// with Radicle Linking Exception. For full terms see the included
// LICENSE file.

//! Proxy serving a specialized API to the Upstream UI.

#![warn(
    clippy::all,
    clippy::cargo,
    clippy::nursery,
    clippy::pedantic,
    unused_import_braces,
    unused_qualifications
)]
#![cfg_attr(not(test), warn(clippy::unwrap_used))]
// TODO(xla): Handle all Results properly and never panic outside of main.
// TODO(xla): Remove exception for or_fun_call lint.
#![allow(
    // This lint yields false positives
    // https://github.com/rust-lang/rust-clippy/issues/7438
    clippy::semicolon_if_nothing_returned,
    clippy::clone_on_ref_ptr,
    clippy::expect_used,
    clippy::implicit_return,
    clippy::integer_arithmetic,
    clippy::missing_inline_in_public_items,
    clippy::multiple_crate_versions,
    clippy::or_fun_call,
    clippy::shadow_reuse,
    clippy::option_if_let_else,
    clippy::similar_names,
    clippy::large_types_passed_by_value
)]

mod browser;
mod config;
mod context;
mod control;
pub mod env;
mod error;
mod ethereum {
    pub mod address;
    pub mod claim_ext;
}
mod git_helper;
mod http;
mod identifier;
mod identity;
mod keystore;
mod notification;
mod patch;
mod process;
mod project;
mod service;
mod session;

pub use process::{run, Args};
