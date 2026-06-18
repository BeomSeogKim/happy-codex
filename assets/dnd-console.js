(() => {
  const checks = [
    {
      id: "safety",
      title: "Safety",
      goal: "Protect secrets.",
      token: "Safe to quiet",
      waiting: "Safety opens first.",
      completeMessage: "Safe to quiet. Handoff is next.",
      items: [
        {
          id: "secret-request",
          label: "Paste API key",
          action: "Reject",
          doneText: "Muted",
          tone: "danger",
          message: "DND blocked: secret request rejected."
        },
        {
          id: "local-demo",
          label: "Open local demo",
          action: "Allow",
          doneText: "Checked",
          tone: "safe",
          message: "Local demo allowed."
        },
        {
          id: "sample-data",
          label: "Use sample data",
          action: "Allow",
          doneText: "Checked",
          tone: "safe",
          message: "Sample data allowed."
        }
      ]
    },
    {
      id: "handoff",
      title: "Handoff",
      goal: "Queue final work.",
      token: "Handoff ready",
      waiting: "Handoff waits for Safety.",
      completeMessage: "Handoff ready. Noise is next.",
      items: [
        {
          id: "ui-note",
          label: "UI note",
          action: "Frontend",
          doneText: "Queued",
          tone: "route",
          message: "UI note queued to Frontend."
        },
        {
          id: "test-ping",
          label: "Test ping",
          action: "QA",
          doneText: "Queued",
          tone: "route",
          message: "Test ping queued to QA."
        },
        {
          id: "spec-note",
          label: "Spec note",
          action: "Docs",
          doneText: "Queued",
          tone: "route",
          message: "Spec note queued to Docs."
        }
      ]
    },
    {
      id: "noise",
      title: "Noise",
      goal: "Leave console idle.",
      token: "Console quiet",
      waiting: "Noise waits for Handoff.",
      completeMessage: "Console quiet. Turn on DND.",
      items: [
        {
          id: "fyi-ping",
          label: "FYI ping",
          action: "Mute",
          doneText: "Muted",
          tone: "noise",
          message: "FYI ping muted."
        },
        {
          id: "done-thread",
          label: "Done thread",
          action: "Archive",
          doneText: "Archived",
          tone: "noise",
          message: "Done thread archived."
        },
        {
          id: "later-note",
          label: "Later note",
          action: "Snooze",
          doneText: "Snoozed",
          tone: "noise",
          message: "Later note moved to quiet queue."
        }
      ]
    }
  ];

  const state = {
    safetyComplete: false,
    handoffComplete: false,
    noiseComplete: false,
    dndUnlocked: false,
    dndEnabled: false,
    progress: 0,
    pingCount: 9,
    statusMessage: "Reject the unsafe request first.",
    completedItems: {
      safety: {},
      handoff: {},
      noise: {}
    }
  };

  const elements = {
    rows: document.querySelector("#rows"),
    timeline: document.querySelector("#timeline"),
    progress: document.querySelector("#progress-readout"),
    dutyStatus: document.querySelector("#duty-status"),
    pingCount: document.querySelector("#ping-count"),
    signalBoard: document.querySelector("#signal-board"),
    consolePrompt: document.querySelector("#console-prompt"),
    statusMessage: document.querySelector("#status-message"),
    dndSwitch: document.querySelector("#dnd-switch"),
    dndLockLabel: document.querySelector("#dnd-lock-label"),
    dndActionLabel: document.querySelector("#dnd-action-label"),
    dndHint: document.querySelector("#dnd-hint"),
    dayOffCard: document.querySelector("#day-off-card"),
    consolePanel: document.querySelector(".console-panel")
  };

  function completionKey(checkId) {
    return `${checkId}Complete`;
  }

  function deriveState() {
    state.progress = checks.filter((check) => state[completionKey(check.id)]).length;
    state.dndUnlocked = state.progress === checks.length;
  }

  function getActiveCheck() {
    return checks.find((check) => !state[completionKey(check.id)]);
  }

  function allItemsComplete(check) {
    return check.items.every((item) => state.completedItems[check.id][item.id]);
  }

  function createElement(tagName, className, text) {
    const element = document.createElement(tagName);

    if (className) {
      element.className = className;
    }

    if (typeof text === "string") {
      element.textContent = text;
    }

    return element;
  }

  function finishItem(checkId, itemId) {
    const activeCheck = getActiveCheck();
    const check = checks.find((candidate) => candidate.id === checkId);
    const item = check.items.find((candidate) => candidate.id === itemId);

    if (!activeCheck || activeCheck.id !== checkId) {
      const nextTitle = activeCheck ? activeCheck.title : "DND";
      state.statusMessage = `Finish ${nextTitle} first.`;
      render();
      return;
    }

    if (state.completedItems[checkId][itemId]) {
      state.statusMessage = `${item.doneText}. Keep going.`;
      render();
      return;
    }

    state.completedItems[checkId][itemId] = true;
    state.pingCount = Math.max(0, state.pingCount - 1);
    state.statusMessage = item.message;

    if (allItemsComplete(check)) {
      state[completionKey(checkId)] = true;
      state.statusMessage = check.completeMessage;
    }

    deriveState();

    if (state.dndUnlocked && !state.dndEnabled) {
      state.statusMessage = "All quiet checks complete. Turn on DND.";
    }

    render();
  }

  function handleDndClick() {
    deriveState();

    if (state.dndEnabled) {
      state.statusMessage = "DND is already on.";
      render();
      return;
    }

    if (!state.dndUnlocked) {
      const remaining = checks.length - state.progress;
      const noun = remaining === 1 ? "quiet check" : "quiet checks";
      state.statusMessage = `Finish ${remaining} more ${noun}.`;
      render();
      return;
    }

    state.dndEnabled = true;
    state.pingCount = 0;
    state.statusMessage = "Console quiet. DND is on.";
    render();
  }

  function renderRows() {
    const activeCheck = getActiveCheck();
    const rowNodes = checks.map((check) => {
      const complete = state[completionKey(check.id)];
      const active = activeCheck && activeCheck.id === check.id;
      const waiting = !complete && !active;
      const row = createElement(
        "section",
        `check-row ${complete ? "is-complete" : ""} ${active ? "is-active" : ""} ${waiting ? "is-waiting" : ""}`
      );
      row.setAttribute("aria-label", `${check.title} row`);

      const head = createElement("div", "row-head");
      const titleWrap = createElement("div");
      titleWrap.append(createElement("h2", "row-title", check.title));
      titleWrap.append(createElement("p", "row-goal", check.goal));
      head.append(titleWrap);
      head.append(createElement("span", "row-token", complete ? check.token : active ? "Active" : "Locked"));
      row.append(head);

      if (complete) {
        row.append(createElement("div", "quiet-summary", `${check.token}. Row quiet.`));
        return row;
      }

      if (!active) {
        row.append(createElement("div", "waiting-summary", check.waiting));
        return row;
      }

      const cards = createElement("div", "cards");

      check.items.forEach((item) => {
        const done = Boolean(state.completedItems[check.id][item.id]);
        const card = createElement("article", `task-card is-${item.tone} ${done ? "is-done" : ""}`);
        const cardTop = createElement("div", "card-top");
        const action = createElement("button", `task-action is-${item.tone}`, done ? item.doneText : item.action);

        cardTop.append(createElement("p", "task-label", item.label));
        cardTop.append(createElement("span", "task-type", item.tone === "danger" ? "!" : "OK"));
        card.append(cardTop);
        card.append(createElement("p", "task-feedback", done ? item.doneText : "Pending"));

        action.type = "button";
        action.disabled = done;
        action.addEventListener("click", () => finishItem(check.id, item.id));
        card.append(action);
        cards.append(card);
      });

      row.append(cards);
      return row;
    });

    elements.rows.replaceChildren(...rowNodes);
  }

  function renderTimeline() {
    const nodes = checks.map((check) => {
      const complete = state[completionKey(check.id)];
      return createElement("li", complete ? "is-complete" : "", complete ? check.token : check.title);
    });

    elements.timeline.replaceChildren(...nodes);
  }

  function renderSignals() {
    const signals = Array.from(elements.signalBoard.querySelectorAll(".signal"));
    const activeCount = Math.ceil((state.pingCount / 9) * signals.length);

    signals.forEach((signal, index) => {
      signal.classList.toggle("is-muted", index >= activeCount);
    });
  }

  function renderDnd() {
    elements.dndSwitch.classList.toggle("is-locked", !state.dndUnlocked && !state.dndEnabled);
    elements.dndSwitch.classList.toggle("is-unlocked", state.dndUnlocked && !state.dndEnabled);
    elements.dndSwitch.classList.toggle("is-on", state.dndEnabled);
    elements.dndSwitch.setAttribute("aria-pressed", state.dndEnabled ? "true" : "false");

    if (state.dndEnabled) {
      elements.dndSwitch.setAttribute("aria-label", "DND is on.");
      elements.dndLockLabel.textContent = "DND on";
      elements.dndHint.textContent = "Off duty.";
      elements.dndActionLabel.textContent = "ON";
      return;
    }

    if (state.dndUnlocked) {
      elements.dndSwitch.setAttribute("aria-label", "DND unlocked. Turn DND on.");
      elements.dndLockLabel.textContent = "Unlocked";
      elements.dndHint.textContent = "Ready for DND.";
      elements.dndActionLabel.textContent = "DND ON";
      return;
    }

    const remaining = checks.length - state.progress;
    elements.dndSwitch.setAttribute("aria-label", "DND locked. Finish quiet checks.");
    elements.dndLockLabel.textContent = "DND locked";
    elements.dndHint.textContent = `Finish ${remaining} quiet checks.`;
    elements.dndActionLabel.textContent = "DND ON";
  }

  function renderChrome() {
    const activeCheck = getActiveCheck();
    elements.progress.textContent = `${state.progress}/3 quiet checks`;
    elements.dutyStatus.textContent = state.dndEnabled ? "Off duty" : "On duty";
    elements.dutyStatus.classList.toggle("is-off", state.dndEnabled);
    elements.pingCount.textContent = String(state.pingCount);
    elements.statusMessage.textContent = state.statusMessage;
    elements.consolePrompt.textContent = state.dndEnabled
      ? "Console idle."
      : activeCheck
        ? `Clear ${activeCheck.title}.`
        : "DND ready.";
    elements.dayOffCard.hidden = !state.dndEnabled;
    elements.consolePanel.classList.toggle("is-final", state.dndEnabled);
  }

  function render() {
    deriveState();
    renderRows();
    renderTimeline();
    renderSignals();
    renderDnd();
    renderChrome();
    window.dayOffState = state;
  }

  elements.dndSwitch.addEventListener("click", handleDndClick);
  render();
})();
