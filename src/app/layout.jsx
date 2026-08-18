import '../index.css';
import '../titans.css';
import '../locations.css';
import '../becomehost.css';
import '../contact.css';
import '../membership.css';

import ScrollProgress from '../components/ScrollProgress';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StickyCta from '../components/StickyCta';
import SocialProofToast from '../components/SocialProofToast';

export const metadata = {
  title: "Titans - The UK's #1 Property Networking Event",
  description: "Titans is the UK's #1 property networking event for serious dealmakers. 120+ investors, developers and property professionals in one room - expert speakers, hot buffet and connections that turn into real deals.",
  icons: {
    icon: '/favicon.svg',
  },
};

/**
 * Browser extensions (Bitdefender, LanguageTool, Grammarly) stamp attributes
 * onto the DOM before React hydrates, which React reports as a hydration
 * mismatch. `suppressHydrationWarning` only covers one element, not its
 * subtree, so it cannot fix this on its own.
 *
 * This runs before hydration, strips those attributes, and keeps stripping them
 * while the page loads. It disconnects shortly after load - once hydration is
 * done React no longer cares, and the extensions can do as they like.
 *
 * Development only: the warning is a dev-time diagnostic, so production ships
 * without this script.
 */
const STRIP_EXTENSION_ATTRS = `(function () {
  var EXACT = ['bis_skin_checked','bis_register','data-lt-installed','data-new-gr-c-s-check-loaded','data-gr-ext-installed','cz-shortcut-listen'];
  var PREFIX = ['__processed_'];
  function unwanted(name) {
    if (EXACT.indexOf(name) !== -1) return true;
    for (var i = 0; i < PREFIX.length; i++) { if (name.lastIndexOf(PREFIX[i], 0) === 0) return true; }
    return false;
  }
  function clean(el) {
    if (!el || el.nodeType !== 1 || !el.attributes) return;
    for (var i = el.attributes.length - 1; i >= 0; i--) {
      var n = el.attributes[i].name;
      if (unwanted(n)) el.removeAttribute(n);
    }
  }
  function sweep(root) {
    clean(root);
    if (root && root.querySelectorAll) {
      var all = root.querySelectorAll('*');
      for (var i = 0; i < all.length; i++) clean(all[i]);
    }
  }
  sweep(document.documentElement);
  var mo = new MutationObserver(function (muts) {
    for (var i = 0; i < muts.length; i++) {
      var m = muts[i];
      if (m.type === 'attributes') {
        if (unwanted(m.attributeName)) m.target.removeAttribute(m.attributeName);
      } else {
        for (var j = 0; j < m.addedNodes.length; j++) sweep(m.addedNodes[j]);
      }
    }
  });
  mo.observe(document.documentElement, { subtree: true, childList: true, attributes: true });
  window.addEventListener('load', function () {
    setTimeout(function () { mo.disconnect(); }, 5000);
  });
})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* First thing in the body, so it runs before the rest is parsed. */}
        {process.env.NODE_ENV === 'development' && (
          <script
            id="strip-extension-attrs"
            dangerouslySetInnerHTML={{ __html: STRIP_EXTENSION_ATTRS }}
          />
        )}
        <ScrollProgress />
        <Header />
        <main>
          {children}
        </main>
        <StickyCta />
        <SocialProofToast />
        <Footer />
      </body>
    </html>
  );
}
