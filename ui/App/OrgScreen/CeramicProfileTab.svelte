<!--
 Copyright © 2021 The Radicle Upstream Contributors

 This file is part of radicle../../src/datastore/safe-datastoreer the GPLv3
 with Radicle Linking Exception. For full terms see the included
 LICENSE file.
-->

<script lang="ts">
    // import type * as org from "ui/src/org";
    // imp../../src/datastore/safe-datastore "ui/src/project";
    // import * as userProfile from "ui/src/userProfile";

  import { ceramicAuthorized, saveProfile, SafeOrgProfile } from 'ui/src/datastore/safe-datastore'
  export let profilePromise: SafeOrgProfile

  // let thisOrgProfile : SafeOrgProfile = {
  //     name: "",
  //     description: "",
  //     url: "",
  //     image: {
  //       original: {
  //         src: "ipfs://yourImageHash",
  //         mimeType: "image/svg",
  //         width: 1,
  //         height:1,
    
  //       }
  //     }
  //   }
    
	// import { onMount } from 'svelte';

  // if (profilePromise) {
  //   thisOrgProfile = profilePromise
  // }

  // onMount(async () => {
    
  //   let loadedProfile = await profilePromise    
  //   if (loadedProfile) {
  //     thisOrgProfile = loadedProfile
  //   }
  // })

  //$: editMode = $ceramicAuthorized
  $: editMode = false

  console.log(profilePromise)
    
  import { Button, Icon, TextInput } from "ui/DesignSystem";
  import { withLock } from "ui/src/screen";


  let inputWidth = "width: 400px;"
  </script>
  
  <style>
    .container {
      margin: 0 auto;
      max-width: var(--content-max-width);
      min-width: var(--content-min-width);
    }
  
    .list-item {
      display: flex;
      height: 56px;
      width: 100%;
      justify-content: space-between;
      padding: 1rem;
      align-items: center;
      min-width: 0;
    }

    .list-container {
    min-width: var(--content-min-width);
    max-width: var(--content-max-width);
    padding: 0 var(--content-padding);
    width: 70%;

  }

  ul {
    width: 100%;
    border: 1px solid var(--color-foreground-level-2);
    border-radius: 0.5rem;
  }

  li {
    display: flex;
    width: 100%;
    flex: 1;
    border-bottom: 1x solid var(--color-foreground-level-2);
    user-select: none;
    overflow: hidden;
  }

  li:last-child {
    border-bottom: 0;
  }

  /* .hover {
    cursor: pointer;
  } */

  .hover:hover {
    background-color: var(--color-foreground-level-1);
  }

  .hover:hover:first-child {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }
  .hover:hover:last-child {
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }

  </style>
  
  <div class="container">

    <div class="list-container" >
      <h3>Basic Profile</h3>
      <br/>

        <ul>
            <li class:hover={true}>
              <div class="list-item">
                <div style="display: flex">
                  <div style="display: flex;">
                    <p>Org Name</p>
                  </div>
                </div>
                <div style="display: flex">
                  <TextInput disabled={!editMode} style={inputWidth}
                  bind:value={profilePromise.name}
                  placeholder="Organization Name"/>
                    </div>
              </div>
            </li>
            <li class:hover={true}>
              <div class="list-item">
                <div style="display: flex">
                  <div style="display: flex;">
                    <p>Organization Description</p>
                  </div>
                </div>
                <div style="display: flex">
                  <TextInput disabled={!editMode} style={inputWidth}
                  bind:value={profilePromise.description}
                  placeholder="Description"/>
                    </div>
              </div>
            </li>
            <li class:hover={true}>
              <div class="list-item">
                <div style="display: flex">
                  <div style="display: flex;">
                    <p>Org URL</p>
                  </div>
                </div>
                {#if editMode}
                <div style="display: flex">
                  <TextInput disabled={!editMode} style={inputWidth}
                  bind:value={profilePromise.url}
                  placeholder="Description"/>
                    </div>
                    {:else}        
                                
<a class="typo-link" style={inputWidth} href={profilePromise?.url}>{profilePromise?.url}</a>

                    {/if}
              </div>
            </li>


        </ul>
<br/>
        <h3>Logo</h3>
        <br/>

        <ul>

        <li class:hover={true}>
          <div class="list-item">
            <div style="display: flex">
              <div style="display: flex;">
                <p>Logo IPFS URL</p>
              </div>
            </div>
            <div style="display: flex">
              <TextInput disabled={!editMode} style={inputWidth}
              bind:value={profilePromise.image.original.src}
              placeholder="Image URL in IPFST format, e.g. ipfs://hash"/>
                </div>
          </div>
        </li>

        <li class:hover={true}>
          <div class="list-item">
            <div style="display: flex">
              <div style="display: flex;">
                <p>MIME type</p>
              </div>
            </div>
            <div style="display: flex">
              <TextInput disabled={!editMode} style={inputWidth}
              bind:value={profilePromise.image.original.mimeType}
              placeholder="MIME type of the image "/>
                </div>
          </div>
        </li>

    </ul>



        <br>
        {#if $ceramicAuthorized}
        {#if editMode}
          <Button icon={Icon.AnchorSmall}  variant="outline" on:click={() => {withLock( async() => {
              saveProfile(profilePromise)
              editMode=false
            }
            )
          }}>Save profile</Button>

          {:else}

          <Button icon={Icon.AnchorSmall}  variant="outline" on:click={() => {
            editMode = true
          }}>Edit profile</Button>

        {/if}
        {/if}
    </div>


    
    </div>
  
