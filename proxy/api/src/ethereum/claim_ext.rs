// Copyright © 2021 The Radicle Upstream Contributors
//
// This file is part of radicle-upstream, distributed under the GPLv3
// with Radicle Linking Exception. For full terms see the included
// LICENSE file.

//! The user identity doc extension for Ethereum addresses attestation.
//! See [the RFC](docs/ethereum_attestation.md).

use crate::ethereum::address::Address;
use chrono::{DateTime, Utc};
use lazy_static::lazy_static;
use link_identities::payload::HasNamespace;
use serde::{Deserialize, Serialize};
use url::Url;

/// The user identity doc extension for Ethereum addresses claims.
/// Meaningful only if confirmed on Ethereum. See [the RFC](docs/ethereum_attestation.md).
#[derive(Clone, Debug, Deserialize, PartialEq, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct V1 {
    /// The Ethereum address claimed by the user.
    pub address: Address,
    /// The timestamp before which the address claim is valid
    pub expiration: DateTime<Utc>,
}

lazy_static! {
    static ref V1_NAMESPACE: Url = "https://radicle.xyz/ethereum/claim/v1"
        .parse()
        .expect("Static URL malformed");
}

impl HasNamespace for V1 {
    fn namespace() -> &'static Url {
        &V1_NAMESPACE
    }
}
