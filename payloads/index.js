onerror = alert;

let savedExtList = [];
const slides = [];
let activeSlideIdx = 0;
const handleCallbacks_ = [];
const WAIT_FOR_FINISH = 1;
const tabInfoList = []; // Array to hold tab information

requestAnimationFrame(function a(t) {
  for (const cb of handleCallbacks_) {
    let m;
    if ((m = cb.f.apply(null, [t - cb.t]))) {
      if (m === 1) {
        return;
      } else {
        handleCallbacks_.splice(handleCallbacks_.indexOf(cb), 1);
      }
    }
  }
  requestAnimationFrame(a);
});

const handleInAnimationFrame = (cb, thiz = null, args = []) => {
  handleCallbacks_.push({
    f: cb,
    t: performance.now(),
  });
};

class DefaultExtensionCapabilities extends ExtensionCapabilities {
  static template = `
    <div id="ext_default">
      <div id="default_extension_capabilities">
        <h1> Default Extension Capabilities </h1>
        <h2>Execute JS Code on a Specific Tab</h2>
        <label for="tab_select">Select a Tab:</label>
        <select id="tab_select"></select>
        <br>
        <label for="js_code_input">Enter JS Code:</label>
        <textarea id="js_code_input" rows="4" cols="50"></textarea>
        <br>
        <button id="execute_js_code">Execute Code</button>
      </div>
    </div>
  `;

  activate() {
    document.write(DefaultExtensionCapabilities.template);
    document.close();

    // Fetch tabs and populate the dropdown
    chrome.tabs.query({}, (tabs) => {
      const tabSelect = document.getElementById('tab_select');
      tabs.forEach((tab, index) => {
        const option = document.createElement('option');
        option.value = tab.id;
        option.textContent = `${tab.title} - ${tab.url}`;
        tabSelect.appendChild(option);
        tabInfoList.push({ id: tab.id, title: tab.title });
      });
    });

    // Add event listener to the execute button
    document
      .getElementById('execute_js_code')
      .addEventListener('click', this.executeCodeOnTab.bind(this));
  }

  executeCodeOnTab() {
    const selectedTabId = parseInt(document.getElementById('tab_select').value);
    const jsCode = document.getElementById('js_code_input').value;

    if (isNaN(selectedTabId) || !jsCode.trim()) {
      alert('Please select a tab and enter JavaScript code.');
      return;
    }

    // Execute the JS code in the selected tab
    chrome.scripting.executeScript(
      {
        target: { tabId: selectedTabId },
        func: new Function(jsCode),
      },
      () => {
        if (chrome.runtime.lastError) {
          alert(`Error: ${chrome.runtime.lastError.message}`);
        } else {
          alert('Code executed successfully!');
        }
      }
    );
  }
}

onload = async function x() {
  let foundNothing = true;
  document.open();
  new DefaultExtensionCapabilities().activate();
  document.close();
  ExtensionCapabilities.setupSlides();
};
