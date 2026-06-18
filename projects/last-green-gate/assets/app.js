(function () {
  const state = {
    safePackComplete: false,
    agentDispatchComplete: false,
    inboxQuietComplete: false,
    dndUnlocked: false,
    dndEnabled: false,
    progress: 0,
    statusMessage: "Start with Safe Pack.",
    activeMission: "safePack",
    startedAt: Date.now(),
    safePack: {
      apiKey: false,
      privateToken: false,
      mockData: false,
    },
    agentDispatch: {
      buildCheck: false,
      inboxSweep: false,
      launchNote: false,
    },
    inboxQuiet: {
      pagerResolved: false,
      fyiThread: false,
      mondayNote: false,
    },
  };

  window.dayOffState = state;

  const missions = [
    {
      id: "safePack",
      label: "Safe Pack",
      token: "No secrets packed",
      completeKey: "safePackComplete",
      stateId: "safePackState",
      itemsId: "safePackItems",
      doneStatus: "No secrets packed.",
      items: [
        {
          id: "apiKey",
          label: "API KEY",
          detail: "Risk dot",
          action: "Remove",
          done: "Removed",
          kind: "risk",
        },
        {
          id: "privateToken",
          label: "PRIVATE TOKEN",
          detail: "Risk dot",
          action: "Remove",
          done: "Removed",
          kind: "risk",
        },
        {
          id: "mockData",
          label: "MOCK DATA",
          detail: "Safe demo",
          action: "Pack",
          done: "Packed",
          kind: "safe",
        },
      ],
    },
    {
      id: "agentDispatch",
      label: "Agent Dispatch",
      token: "Work safely assigned",
      completeKey: "agentDispatchComplete",
      stateId: "agentDispatchState",
      itemsId: "agentDispatchItems",
      doneStatus: "Work safely assigned.",
      items: [
        {
          id: "buildCheck",
          label: "Build Check",
          detail: "Helper agent",
          action: "Assign",
          done: "Assigned",
        },
        {
          id: "inboxSweep",
          label: "Inbox Sweep",
          detail: "Helper agent",
          action: "Assign",
          done: "Assigned",
        },
        {
          id: "launchNote",
          label: "Launch Note",
          detail: "Helper agent",
          action: "Assign",
          done: "Assigned",
        },
      ],
    },
    {
      id: "inboxQuiet",
      label: "Inbox Quiet",
      token: "No pending fires",
      completeKey: "inboxQuietComplete",
      stateId: "inboxQuietState",
      itemsId: "inboxQuietItems",
      doneStatus: "No pending fires.",
      items: [
        {
          id: "pagerResolved",
          label: "Pager resolved",
          detail: "Badge clears",
          action: "Clear",
          done: "Cleared",
        },
        {
          id: "fyiThread",
          label: "FYI thread",
          detail: "Noise line",
          action: "Clear",
          done: "Cleared",
        },
        {
          id: "mondayNote",
          label: "Monday note",
          detail: "Light off",
          action: "Clear",
          done: "Cleared",
        },
      ],
    },
  ];

  const els = {
    body: document.body,
    progressText: document.getElementById("progressText"),
    timerText: document.getElementById("timerText"),
    statusMessage: document.getElementById("statusMessage"),
    dndButton: document.getElementById("dndButton"),
    endingCopy: document.getElementById("endingCopy"),
    tokenStrip: document.getElementById("tokenStrip"),
  };

  function missionComplete(mission) {
    return mission.items.every((item) => state[mission.id][item.id]);
  }

  function setActiveMission() {
    const nextMission = missions.find((mission) => !state[mission.completeKey]);
    state.activeMission = nextMission ? nextMission.id : "dnd";
  }

  function updateDerivedState() {
    state.safePackComplete = missionComplete(missions[0]);
    state.agentDispatchComplete = missionComplete(missions[1]);
    state.inboxQuietComplete = missionComplete(missions[2]);
    state.progress = missions.filter((mission) => state[mission.completeKey]).length;
    state.dndUnlocked =
      state.safePackComplete && state.agentDispatchComplete && state.inboxQuietComplete;
    setActiveMission();
  }

  function nextMissionLabel() {
    const mission = missions.find((candidate) => !state[candidate.completeKey]);
    return mission ? mission.label : "DND";
  }

  function completedItemCount(missionId) {
    const mission = missions.find((candidate) => candidate.id === missionId);
    return mission.items.filter((item) => state[missionId][item.id]).length;
  }

  function setStatus(message) {
    state.statusMessage = message;
    els.statusMessage.textContent = message;
  }

  function handleItemClick(missionId, itemId, requestedAction) {
    if (state.dndEnabled) {
      setStatus("DND is already on.");
      return;
    }

    if (state.activeMission !== missionId) {
      setStatus("Clear the active mission first.");
      render();
      return;
    }

    const mission = missions.find((candidate) => candidate.id === missionId);
    const item = mission.items.find((candidate) => candidate.id === itemId);
    const action = requestedAction || item.action;

    if (missionId === "safePack" && item.kind === "risk" && action === "Pack") {
      setStatus("Blocked: secrets stay home");
      render();
      return;
    }

    state[missionId][itemId] = true;
    updateDerivedState();

    if (state[mission.completeKey]) {
      setStatus(mission.doneStatus);
    } else {
      setStatus(item.done + ": " + item.label + ".");
    }

    if (state.dndUnlocked) {
      setStatus("DND unlocked. Start Day Off.");
    }

    render();
  }

  function handleDndClick() {
    updateDerivedState();

    if (!state.dndUnlocked) {
      setStatus("Clear " + nextMissionLabel() + " first.");
      render();
      return;
    }

    state.dndEnabled = true;
    state.statusMessage = "Day Off gate open.";
    render();
  }

  function renderItems(mission) {
    const container = document.getElementById(mission.itemsId);
    const isActive = state.activeMission === mission.id && !state.dndEnabled;
    container.innerHTML = "";

    mission.items.forEach((item) => {
      const done = state[mission.id][item.id];
      const row = document.createElement("div");
      row.className = "work-item" + (done ? " done" : "");

      const copy = document.createElement("div");
      copy.className = "item-copy";

      const title = document.createElement("span");
      title.className = "item-title";
      title.textContent = item.label;

      const detail = document.createElement("span");
      detail.className = "item-detail";
      detail.textContent = done ? item.done : item.detail;

      copy.append(title, detail);

      const button = document.createElement("button");
      button.className = "item-action";
      button.type = "button";
      button.dataset.mission = mission.id;
      button.dataset.item = item.id;
      button.dataset.action = item.action;
      button.textContent = done ? item.done : item.action;
      button.disabled = done || !isActive;
      button.addEventListener("click", () => handleItemClick(mission.id, item.id, item.action));

      row.append(copy, button);
      container.append(row);
    });
  }

  function renderMissions() {
    missions.forEach((mission) => {
      const card = document.querySelector('[data-mission="' + mission.id + '"]');
      const label = document.getElementById(mission.stateId);
      const complete = state[mission.completeKey];
      const active = state.activeMission === mission.id && !state.dndEnabled;

      card.classList.toggle("active", active);
      card.classList.toggle("complete", complete);
      card.classList.toggle("locked", !active && !complete);

      if (state.dndEnabled) {
        label.textContent = "Complete";
      } else if (complete) {
        label.textContent = "Done";
      } else if (active) {
        label.textContent = "Active";
      } else {
        label.textContent = "Locked";
      }

      renderItems(mission);
    });
  }

  function renderTokens() {
    const tokens = Array.from(els.tokenStrip.querySelectorAll(".token"));

    missions.forEach((mission, index) => {
      tokens[index].classList.toggle("earned", state[mission.completeKey]);
    });
  }

  function renderBodyState() {
    els.body.classList.remove("progress-0", "progress-1", "progress-2", "progress-3", "dnd-enabled");
    els.body.classList.add("progress-" + state.progress);
    els.body.classList.toggle("dnd-enabled", state.dndEnabled);
    els.body.dataset.progress = String(state.progress);
    els.body.dataset.dndUnlocked = String(state.dndUnlocked);
    els.body.dataset.dndEnabled = String(state.dndEnabled);
    els.body.dataset.activeMission = state.activeMission;
    els.body.dataset.safePackCleared = String(completedItemCount("safePack"));
    els.body.dataset.agentAssigned = String(completedItemCount("agentDispatch"));
    els.body.dataset.inboxCleared = String(completedItemCount("inboxQuiet"));
  }

  function renderDnd() {
    els.progressText.textContent = state.progress + "/3";
    els.dndButton.disabled = state.dndEnabled;
    els.dndButton.classList.toggle("is-locked", !state.dndUnlocked && !state.dndEnabled);
    els.dndButton.dataset.locked = String(!state.dndUnlocked && !state.dndEnabled);
    els.dndButton.dataset.primary = String(state.dndUnlocked && !state.dndEnabled);
    els.dndButton.setAttribute("aria-disabled", String(!state.dndUnlocked || state.dndEnabled));
    els.dndButton.textContent = state.dndEnabled
      ? "DND ON"
      : state.dndUnlocked
        ? "DND ON"
        : "DND locked";

    if (state.dndEnabled) {
      els.statusMessage.textContent = "Day Off gate open.";
      els.endingCopy.hidden = false;
    } else {
      els.statusMessage.textContent = state.statusMessage;
      els.endingCopy.hidden = true;
    }
  }

  function renderTimer() {
    const elapsedSeconds = Math.floor((Date.now() - state.startedAt) / 1000);
    const secondsLeft = Math.max(0, 60 - elapsedSeconds);
    els.timerText.textContent = secondsLeft + "s";
  }

  function render() {
    updateDerivedState();
    renderBodyState();
    renderMissions();
    renderTokens();
    renderDnd();
    window.dayOffState = state;
  }

  els.dndButton.addEventListener("click", handleDndClick);
  render();
  renderTimer();
  window.setInterval(renderTimer, 1000);
})();
