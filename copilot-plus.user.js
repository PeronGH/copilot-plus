// ==UserScript==
// @name         Copilot Plus
// @namespace    https://copilot.microsoft.com/
// @version      2024-03-03
// @description  Unlock your Copilot experience.
// @author       PeronGH
// @match        https://copilot.microsoft.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=microsoft.com
// @grant        none
// ==/UserScript==

(() => {
  "use strict";

  const CIB = window.CIB;

  // Helpers

  function inPlaceFilter(arr, callback) {
    for (let i = 0; i < arr.length;) {
      if (!callback(arr[i], i, arr)) {
        arr.splice(i, 1);
      } else {
        i++;
      }
    }
  }

  // Request Parameters

  function addOptions(...options) {
    const optionsSets = CIB.config.sydney.request.optionsSets;
    for (const option of options) {
      if (!optionsSets.includes(option)) {
        optionsSets.push(option);
      }
    }
  }

  function filterOptions(filter) {
    inPlaceFilter(CIB.config.sydney.request.optionsSets, filter);
  }

  // System Events

  function onSystemEvent(handler) {
    let systemEventHandlerQueued = false;
    CIB.eventBus.onSystemEvent((e) => {
      console.info("System Event", e);
      if (!systemEventHandlerQueued) {
        systemEventHandlerQueued = true;
        queueMicrotask(async () => {
          systemEventHandlerQueued = false;
          await handler(e);
        });
      }
    });
  }

  // Main

  onSystemEvent(({ type, data }) => {
    addOptions("gpt4tmncnp");
    CIB.config.sydney.request.sliceIds.length = 0;
    console.info(CIB.config.sydney.request);
  });
})();
