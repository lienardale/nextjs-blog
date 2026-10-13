'use client';

import {useSyncExternalStore} from 'react';
import {THEME_SCRIPT} from '../../../lib/theme';

const subscribe = () => () => {};

// The blocking script only has to exist in the server HTML. Rendering it
// again on the client (the root layout remounts on a locale switch) would
// do nothing except make React warn about a <script> it won't execute.
export default function ThemeScript() {
  const isServerRender = useSyncExternalStore(subscribe, () => false, () => true);
  return isServerRender ? <script dangerouslySetInnerHTML={{__html: THEME_SCRIPT}} /> : null;
}
