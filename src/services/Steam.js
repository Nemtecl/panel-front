import { url } from '../plugins';

// eslint-disable-next-line import/prefer-default-export
export function redirect() {
  const params = url.encodeQueryData({
    'openid.ns': 'http://specs.openid.net/auth/2.0',
    'openid.mode': 'checkid_setup',
    'openid.return_to': 'http://localhost:3000/login',
    'openid.identity': 'http://specs.openid.net/auth/2.0/identifier_select',
    'openid.claimed_id': 'http://specs.openid.net/auth/2.0/identifier_select',
  });

  window.location.href = `https://steamcommunity.com/openid/login?${params}`;
}
