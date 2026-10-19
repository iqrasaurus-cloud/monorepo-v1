/**
 * Night on the brand sites follows the family's own choice in the tools (owner, 2026-10-19).
 * Day is the default. The tools save the choice in the `iq_family` cookie on .iqrasaurus.com
 * (tadabbur-for-kids-v1, packages/design/src/family.ts); this reads it before the page paints,
 * so Night never flashes Day. It only reads: the sites set no cookie and send nothing anywhere.
 * Put it in <head>, and give <html> suppressHydrationWarning.
 */
const js =
  'try{var m=document.cookie.match(/(?:^|; )iq_family=([^;]*)/);if(m){' +
  'var b=atob(m[1].replace(/-/g,"+").replace(/_/g,"/"));' +
  'var f=JSON.parse(new TextDecoder().decode(Uint8Array.from(b,function(c){return c.charCodeAt(0)})));' +
  'if(f&&f.s&&f.s.theme==="night")document.documentElement.setAttribute("data-theme","night")}}catch(e){}'

export function NightScript() {
  return <script dangerouslySetInnerHTML={{ __html: js }} />
}
