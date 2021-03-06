<!--
 Copyright © 2021 The Radicle Upstream Contributors

 This file is part of radicle-upstream, distributed under the GPLv3
 with Radicle Linking Exception. For full terms see the included
 LICENSE file.
-->
<script lang="ts">
  import { onDestroy } from "svelte";

  import * as Session from "ui/src/session";
  import * as localPeer from "ui/src/localPeer";
  import * as modal from "ui/src/modal";
  import * as error from "ui/src/error";
  import * as notification from "ui/src/notification";
  import * as remote from "ui/src/remote";
  import * as router from "ui/src/router";
  import * as userProfile from "ui/src/userProfile";
  import type { User, Project, ConfirmedAnchor } from "ui/src/project";
  import { copyToClipboard } from "ui/src/ipc";
  import { isMaintainer, isContributor } from "ui/src/project";
  import {
    fetch,
    selectPeer,
    refreshPeers,
    store,
  } from "ui/src/screen/project";

  import { Button, Icon, ThreeDotsMenu, format } from "ui/DesignSystem";

  import ScreenLayout from "ui/App/ScreenLayout.svelte";
  import Header from "ui/App/ScreenLayout/Header.svelte";

  import ManagePeersModal from "./ProjectScreen/ManagePeersModal.svelte";
  import PeerSelector from "./ProjectScreen/PeerSelector.svelte";
  import ProjectHeader from "./ProjectScreen/ProjectHeader.svelte";
  import Source from "./ProjectScreen/Source.svelte";
  import type * as projectRoute from "./ProjectScreen/route";

  export let urn: string;
  export let anchors: ConfirmedAnchor[];
  export let activeView: projectRoute.ProjectView = { type: "files" };
  let hoverstyle: string = "";

  const mouseenter = () => {
    hoverstyle = "background-color: var(--color-foreground-level-2)";
  };
  const mouseleave = () => {
    hoverstyle = "";
  };

  const session = Session.unsealed();
  const trackTooltipMaintainer = "You can't unfollow your own project";
  const trackTooltip = "Unfollowing is not yet supported";

  const menuItems = (project: Project) => {
    return [
      {
        title: "Copy Radicle ID",
        icon: Icon.At,
        event: () => {
          copyToClipboard(project.urn);
          notification.info({ message: "Radicle ID copied to your clipboard" });
        },
        tooltip: format.shortUrn(project.urn),
      },
      {
        title: "Unfollow",
        icon: Icon.Network,
        disabled: true,
        event: () => {},
        tooltip: isMaintainer(session.identity.urn, project)
          ? trackTooltipMaintainer
          : trackTooltip,
      },
    ];
  };

  const onOpenPeer = ({ detail: peer }: { detail: User }) => {
    userProfile.openUserProfile(peer.identity.urn);
  };
  const onPeerModal = () => {
    modal.toggle(ManagePeersModal);
  };

  const onSelectPeer = ({ detail: peer }: { detail: User }) => {
    selectPeer(peer);
  };

  const unsubscribeFromProjectEvents = localPeer.projectEvents.onValue(
    event => {
      if (event.urn === urn) {
        refreshPeers();
      }
    }
  );
  onDestroy(unsubscribeFromProjectEvents);

  // Initialise the screen by fetching the project and associated data.
  fetch(urn);

  $: if ($store.status === remote.Status.Error) {
    error.show($store.error);
  }
</script>

<ScreenLayout dataCy="project-screen">
  {#if $store.status === remote.Status.Success}
    <Header>
      <ProjectHeader
        slot="left"
        urn={$store.data.project.urn}
        name={$store.data.project.metadata.name}
        description={$store.data.project.metadata.description}
        stats={$store.data.project.stats}
        latestAnchorTimestamp={anchors.slice(-1)[0]?.timestamp}
        onClick={() =>
          router.push({
            type: "project",
            params: {
              urn: urn,
              activeView: { type: "files" },
            },
          })} />

      <div slot="right" style="display: flex;">
        <div style="display: flex;" class="button-transition">
          <PeerSelector
            peers={$store.data.peerSelection}
            on:modal={onPeerModal}
            on:open={onOpenPeer}
            on:select={onSelectPeer}
            selected={$store.data.selectedPeer} />
          <Button
            dataCy="manage-remotes"
            icon={Icon.Pen}
            variant="outline"
            transition={false}
            on:click={onPeerModal}
            on:mouseenter={mouseenter}
            on:mouseleave={mouseleave}
            style={`margin-right: 1rem; border-top-left-radius: 0; border-bottom-left-radius: 0; padding: 0 0.5rem; ${hoverstyle}`} />
        </div>
        <ThreeDotsMenu menuItems={menuItems($store.data.project)} />
      </div>
    </Header>
    <Source
      {activeView}
      project={$store.data.project}
      selectedPeer={$store.data.selectedPeer}
      {anchors}
      isContributor={isContributor($store.data.peerSelection)} />
  {/if}
</ScreenLayout>
