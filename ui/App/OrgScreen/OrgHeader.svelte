<!--
 Copyright © 2021 The Radicle Upstream Contributors

 This file is part of radicle-upstream, distributed under the GPLv3
 with Radicle Linking Exception. For full terms see the included
 LICENSE file.
-->
<script lang="ts">
  import {
    Avatar,
    Copyable,
    CopyableIdentifier,
    Icon,
    format,
  } from "ui/DesignSystem";

  import * as ensResolver from "ui/src/org/ensResolver";
  import * as ipc from "ui/src/ipc";
  import type { SafeOrgProfile } from "ui/src/datastore/safe-datastore";

  export let orgAddress: string;
  export let ownerAddress: string;
  export let orgProfile: SafeOrgProfile  | undefined = undefined;
  export let threshold: number | undefined = undefined;
  export let registration: ensResolver.Registration | undefined = undefined;

  // let thisOrgProfile : SafeOrgProfile;
	// import { onMount } from 'svelte';
  // onMount(async () => {
  //   thisOrgProfile = await orgProfile
  // })

  $: name = registration?.domain.replace(`.${ensResolver.DOMAIN}`, "");
  $: websiteUrl = registration?.url;
  $: githubUrl =
    registration?.github && `https://github.com/${registration.github}`;
  $: twitterUrl =
    registration?.twitter &&
    `https://twitter.com/${registration.twitter.replace("@", "")}`;
  $: seedId = registration?.seedId;
  $: seedHost = registration?.seedHost;
</script>

<style>
  .metadata {
    display: flex;
    flex-direction: column;
    align-self: center;
    width: -webkit-fill-available;
    min-width: 0;
    white-space: nowrap;
  }
  .row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }
  .name {
    margin-bottom: 0.5rem;
  }
  .domain {
    color: var(--color-foreground-level-4);
  }
  .url {
    cursor: pointer;
  }
</style>

<div style="display: flex">

{#if registration?.avatar} 
  
<Avatar
    style="margin-right: 2rem;"
    size="huge"
    kind={{ type: "orgImage", url: registration.avatar }} />

  {:else} 
    <!-- {#await orgProfile then value} -->
      {#if orgProfile?.image?.original?.src }
        <Avatar
          style="margin-right: 2rem;"
          size="huge"
          kind={{ type: "orgImage", url: "https://ipfs.io/ipfs/"+orgProfile?.image?.original?.src.substring(7)}} />

      {:else}
         <Avatar
             style="margin-right: 2rem;"
             size="huge"
             kind={{ type: "orgEmoji", uniqueIdentifier: orgAddress }} />
     {/if}
      
    <!-- {/await} -->

  {/if}
  <!-- <Avatar
    style="margin-right: 2rem;"
    size="huge"
    kind={registration?.avatar
      ? { type: "orgImage", url: registration.avatar }
      : { type: "orgEmoji", uniqueIdentifier: orgAddress }} />
 -->
  <div class="metadata">
    <Copyable
      name="org address"
      clipboardContent={orgAddress}
      tooltipStyle="width: fit-content;">
      <h1 data-cy="entity-name" class="typo-overflow-ellipsis name">
        {#if name}
          {name}<span class="domain">.{ensResolver.DOMAIN}</span>
        {:else}
          {format.shortEthAddress(orgAddress)}
        {/if}
      </h1>
    </Copyable>
    <div style="display: flex; gap: 1rem;">
      <div>
        <div class="row">
          {#if threshold}
            <Icon.Gnosis />
          {:else}
            <Icon.Ethereum />
          {/if}
          <CopyableIdentifier
            value={ownerAddress}
            kind="ethAddress"
            name="owner address"
            showIcon={false} />
        </div>
        {#if threshold}
          <div class="row">
            <Icon.Orgs />
            {threshold}
            {threshold === 1 ? "signature" : "signatures"} required for quorum
          </div>
        {/if}
      </div>
      {#if websiteUrl || githubUrl || twitterUrl || (seedId && seedHost)}
        <div>
          {#if websiteUrl}
            <div class="row">
              <Icon.Globe />
              <div class="url">
                <span
                  on:click={() => {
                    websiteUrl && ipc.openUrl(websiteUrl);
                  }}>{websiteUrl}</span>
              </div>
            </div>
          {/if}
          {#if githubUrl}
            <div class="row">
              <Icon.Github />
              <div class="url">
                <span
                  on:click={() => {
                    githubUrl && ipc.openUrl(githubUrl);
                  }}>{githubUrl}</span>
              </div>
            </div>
          {/if}
          {#if twitterUrl}
            <div class="row">
              <Icon.Twitter />
              <div class="url">
                <span
                  on:click={() => {
                    twitterUrl && ipc.openUrl(twitterUrl);
                  }}>{twitterUrl}</span>
              </div>
            </div>
          {/if}
        </div>
        <div>
          {#if seedId && seedHost}
            <div class="row">
              <CopyableIdentifier
                value={`${seedId}@${seedHost}:8776`}
                kind="seedAddress" />
            </div>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</div>
