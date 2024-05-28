function changeProfilePicture(element) {
    const profilePicture = element.querySelector(".ivm-view-attr__img--centered");
    if (profilePicture) {
      profilePicture.src = "https://via.placeholder.com/150";
    }
  }
  
  function handleMutation(mutationsList, observer) {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains("update-components-actor__avatar")) {
            changeProfilePicture(node);
          }
        });
      }
    }
  }
  
  const observer = new MutationObserver(handleMutation);
  observer.observe(document.body, { childList: true, subtree: true });
  
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "change-profile-picture") {
      // Trigger the change for existing profile pictures
      document.querySelectorAll(".update-components-actor__avatar").forEach(changeProfilePicture);
    }
  });
  