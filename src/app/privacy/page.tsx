import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>

        <p className="text-gray-700 mb-4">
          This Privacy Policy explains how Select Care collects, uses, and discloses information when you use the Select Care Chrome extension and the associated web services.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Data Collected</h2>
        <p className="text-gray-700 mb-3">
          We collect minimal data necessary to provide the extension functionality:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Authentication token and user email (stored locally via chrome.storage) to maintain your logged-in state.</li>
          <li>Selected text and related metadata only when you explicitly use the extension to save or act on a selection. This data is sent to our hosted web app when we need to call the translation API, or choose to sync or sign in (if applicable).</li>
          <li>Basic usage telemetry (optional) if you opt in; this helps improve the product. We do not collect sensitive personal data.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-2">How We Use Data</h2>
        <p className="text-gray-700 mb-3">
          The data is used to:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Persist your login state and preferences across sessions (if applicable, not now).</li>
          <li>Provide syncing to the hosted web app (if applicable) and export features to other apps (when you sign in and consent).</li>
          <li>Enable in-context features such as opening the side panel for the active tab.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Third-Party Services</h2>
        <p className="text-gray-700 mb-3">
          We use a hosted web application at <code>https://main.djfc0uq2bj5xw.amplifyapp.com</code> for user sign-in and optional syncing. Opening that site in a browser tab is used for authentication flows; the site does not execute extension code. We do not load remote code into the extension from that origin.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Permissions</h2>
        <p className="text-gray-700 mb-3">
          The extension requests the following permissions and only uses them for the purposes described:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><strong>storage</strong>: store application data, authentication token, user email, and lightweight preferences locally.</li>
          <li><strong>activeTab</strong>: identify the active tab so the side panel and content actions operate in the correct context.</li>
          <li><strong>sidePanel</strong>: open the extension dashboard as an in-context side panel.</li>
          <li><strong>scripting</strong>: inject scripts on-demand to read selected text or interact with the current page when you explicitly trigger an action.</li>
          <li><strong>Host permission</strong> for <code>https://main.djfc0uq2bj5xw.amplifyapp.com/*</code>: used only to call translation APIs (for now) and open the hosted web app for sign-in and optional syncing (if applicable).</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Data Sharing and Security</h2>
        <p className="text-gray-700 mb-3">
          We do not share your data with third parties except as necessary to provide the service (for example, exporting to integrations you authorize). Stored tokens and user identifiers are kept only as long as needed. We follow standard security practices to protect stored data.
        </p>

        {/* <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Your Choices</h2>
  <p className="text-gray-700 mb-3">You can sign out at any time from the extension popup which clears locally stored authentication credentials. You can also disable sync or opt out of any optional telemetry in the extension settings (if enabled).</p> */}

        <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Contact</h2>
        <p className="text-gray-700 mb-6">If you have questions about privacy, please contact us at tonolabvn@gmail.com.</p>

        <p className="text-sm text-gray-500">Last updated: October 17, 2025</p>
      </div>
    </div>
  );
}
