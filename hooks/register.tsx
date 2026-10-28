import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

type Look = {
  k: string; name: string; bg: string; skin: string; hair: string; cloth: string
  style: 'boss' | 'bai' | 'yi' | 'ya'
  eye?: string; mouth?: 'soft' | 'pout' | 'coral'
}

const CAST: Look[] = [
  { k: 'boss', name: '总指挥', bg: '#3FC7B0', skin: '#F7DFCF', hair: '#F0DE9C', cloth: '#BFDDEE', style: 'boss' },
  { k: 'bai', name: '小白', bg: '#D9D8DA', skin: '#F8DDCE', hair: '#1B1620', cloth: '#F4EEE2', style: 'bai', eye: '#2E2320', mouth: 'soft' },
  { k: 'yi', name: '小依', bg: '#6F7A8A', skin: '#F9DCCB', hair: '#8A5A3C', cloth: '#1D1B1C', style: 'yi', eye: '#4A4A4F', mouth: 'pout' },
  { k: 'ya', name: '小娅', bg: '#B9A19B', skin: '#FADFD0', hair: '#7A4A33', cloth: '#F3EBDD', style: 'ya', eye: '#8A7A3A', mouth: 'coral' },
]

function face(c: Look, busy: boolean): string {
  const { skin, hair } = c
  const eyeC = c.eye ?? '#3A2B22'
  let back = ''
  let front = ''
  let extra = ''
  if (c.style === 'boss') {
    back = `<path d="M12 46c-2-22 7-33 20-33s22 11 20 33l2 18H10z" fill="${hair}"/>`
    front = `<path d="M17 37c-1-15 6-22 15-22s16 7 15 22c-2-8-7-12-15-12s-13 4-15 12z" fill="${hair}"/><path d="M32 15v9" stroke="#6E5B3A" stroke-width="1.8" stroke-linecap="round"/>`
    extra = `<g><ellipse cx="17" cy="57" rx="9" ry="7.5" fill="#FBFBFB"/><ellipse cx="14" cy="55.5" rx="1" ry="1.3" fill="#7A8794"/><ellipse cx="20" cy="55.5" rx="1" ry="1.3" fill="#7A8794"/><path d="M9 52c2-4 9-5 13-2-3 1-9 2-13 2z" fill="#F6E27A"/><ellipse cx="46" cy="57" rx="9" ry="7.5" fill="#FFFFFF"/><ellipse cx="43" cy="56" rx="1.1" ry="1.5" fill="#4F9BE8"/><ellipse cx="49" cy="56" rx="1.1" ry="1.5" fill="#4F9BE8"/><path d="M44.5 59q1.5 1 3 0" stroke="#4F9BE8" stroke-width=".8" fill="none"/></g>`
  }
  if (c.style === 'bai') {
    back = `<path d="M40 8c8-4 15 1 14 9 1 8-1 16 2 26 1 6 0 14-3 21l-6-2c3-8 3-15 1-22-2-8-1-14-5-18z" fill="${hair}"/><path d="M13 42c-1-18 7-28 19-28s20 10 19 28z" fill="${hair}"/>`
    front = `<path d="M15 39c-1-17 6-25 17-25s18 8 17 25c-2-9-8-14-17-14s-15 5-17 14z" fill="${hair}"/><path d="M30 14q-1 5 0 11" stroke="#51444F" stroke-width="1" fill="none" stroke-linecap="round"/><path d="M38 8c4-3 9-1 9 3-4-1-7 0-9-3z" fill="${hair}"/>`
    extra = `<circle cx="49.5" cy="46" r="3.6" fill="none" stroke="#D9DEE4" stroke-width="1.3"/><path d="M24 52q8 12 16 0" stroke="#D4B26A" stroke-width=".8" fill="none"/><path d="M28 58q4 6 8 0" stroke="#D4B26A" stroke-width=".8" fill="none"/><circle cx="32" cy="63" r="1.4" fill="#9AA0A8"/><path d="M26 54l-4-1M38 54l4-1" stroke="#EFE7D8" stroke-width="3" stroke-linecap="round"/><ellipse cx="13" cy="50" rx="9.5" ry="13" fill="#FBF6EC"/><ellipse cx="12" cy="46" rx="6" ry="8" fill="#F4EEE2"/><path d="M9 38q-2 3-1 7M14 36q-2 4-1 9" stroke="#E6DCCB" stroke-width=".9" fill="none" stroke-linecap="round"/>`
  }
  if (c.style === 'yi') {
    back = `<ellipse cx="50" cy="48" rx="5.5" ry="12" fill="${hair}"/><path d="M13 42c-1-18 7-28 19-28s20 10 19 28z" fill="${hair}"/>`
    front = `<path d="M15 39c-1-17 6-25 17-25s18 8 17 25c-2-9-8-14-17-14s-15 5-17 14z" fill="${hair}"/><path d="M32 14v10" stroke="#5E3B26" stroke-width="1.3" stroke-linecap="round"/><path d="M16 38c0 5 1 8 2 10" stroke="${hair}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`
    extra = `<rect x="25" y="49" width="14" height="5" rx="2" fill="#141214"/><path d="M44 53q8 1 14 8v5H40z" fill="#6B5B3E"/><circle cx="14.5" cy="47" r="3.4" fill="none" stroke="#D5DAE0" stroke-width="1.2"/><circle cx="49.5" cy="47" r="3.4" fill="none" stroke="#D5DAE0" stroke-width="1.2"/><g><path d="M7 63l5-9" stroke="#3E8A4D" stroke-width="1.4" stroke-linecap="round"/><path d="M4 57c3-3 6-2 8 0-3 2-6 3-8 0z" fill="#4E9A5C"/><circle cx="11" cy="52" r="4.4" fill="#D9322F"/><circle cx="17" cy="55" r="4" fill="#E8453F"/><circle cx="11" cy="52" r="1.8" fill="#A81F1F"/><circle cx="17" cy="55" r="1.6" fill="#B52424"/></g>`
  }
  if (c.style === 'ya') {
    back = `<path d="M10 48c-3-6-1-12 0-17 0-12 8-18 22-18s22 6 22 18c1 5 3 11 0 17l-5 4H15z" fill="${hair}"/><ellipse cx="53" cy="52" rx="3.6" ry="3.2" fill="${hair}"/><ellipse cx="54.5" cy="57.5" rx="3.6" ry="3.2" fill="${hair}"/><ellipse cx="53" cy="63" rx="3.4" ry="3" fill="${hair}"/>`
    front = `<path d="M16 39c-2-16 5-25 16-25s18 9 16 25c-1-5-3-9-6-11-4 4-9 6-14 6-4 0-7-1-9-4-2 2-2 6-3 9z" fill="${hair}"/><path d="M32 14v8" stroke="#5A3522" stroke-width="1" stroke-linecap="round"/><path d="M44 19q3-6 7-4-1 5-5 9z" fill="#FFFFFF"/>`
    extra = `<path d="M23 52q9 5 18 0" stroke="#D9CDB8" stroke-width="1" fill="none"/><path d="M18 59h28M20 62h24" stroke="#D9CDB8" stroke-width=".7"/><path d="M50 55l4 2.4-4 2.4zM57 55l-4 2.4 4 2.4z" fill="#FFFFFF"/><circle cx="45.5" cy="45" r="1.5" fill="#E8B79A"/>`
  }
  const rx = c.eye ? 2.5 : 2.1
  const ry = c.eye ? 3.2 : 3
  const wing = c.style === 'bai' ? `<path d="M22.5 36.4l-3-2M41.5 36.4l3-2" stroke="#1B1620" stroke-width="1.2" stroke-linecap="round"/>` : ''
  const shine = c.eye
    ? [26.8, 38.8].map(x => `<circle cx="${x}" cy="35.8" r="0.9" fill="#FFFFFF"><animate attributeName="r" values="0.9;0.9;0;0.9" keyTimes="0;0.93;0.96;1" dur="4.8s" repeatCount="indefinite"/></circle>`).join('')
    : ''
  const lift = busy ? -2 : 0
  const brow = `<path d="M22 ${31 + lift}q4-2.6 8-.6M34 ${30.4 + lift}q4-2 8 .6" stroke="rgba(0,0,0,.35)" stroke-width="1.3" fill="none" stroke-linecap="round"/>`
  let mouth = `<path d="M28.8 45.8q3.2 2 6.4 0" stroke="#D77A7A" stroke-width="1.7" fill="none" stroke-linecap="round"/>`
  if (c.mouth === 'pout') mouth = `<ellipse cx="32" cy="46" rx="2.6" ry="1.9" fill="#E58E8A"/><path d="M29.6 45.6q2.4 1 4.8 0" stroke="#B85454" stroke-width=".7" fill="none"/>`
  if (c.mouth === 'coral') mouth = `<path d="M28.3 45.6q3.7 3 7.4 0q-3.7-1.8-7.4 0z" fill="#E4756F"/>`
  if (busy) mouth = `<ellipse cx="32" cy="46.8" rx="2" ry="2.4" fill="#7A3E32"/>`
  const cheek = `<g fill="#F08C8C" opacity=".5"><circle cx="22" cy="42" r="3.2"/><circle cx="42" cy="42" r="3.2"/></g>`
  const blink = `<animate attributeName="ry" values="${ry};${ry};0.3;${ry}" keyTimes="0;0.93;0.96;1" dur="4.8s" repeatCount="indefinite"/>`
  const look = `<animateTransform attributeName="transform" type="translate" values="0 0;1.6 0;1.6 0;-1.6 .6;-1.6 .6;0 0" keyTimes="0;.2;.4;.6;.8;1" dur="7s" repeatCount="indefinite"/>`
  const hop = busy
    ? `<animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="0.8s" repeatCount="indefinite"/>`
    : `<animateTransform attributeName="transform" type="translate" values="0 0;0 0;0 -5;0 0;0 0" keyTimes="0;.9;.94;.98;1" dur="6s" repeatCount="indefinite"/>`
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="44" height="44"><defs><clipPath id="c"><circle cx="32" cy="32" r="32"/></clipPath></defs>
<g clip-path="url(#c)"><rect width="64" height="64" fill="${c.bg}"/><g>${hop}
${back}<path d="M10 66c0-11 9-15 22-15s22 4 22 15z" fill="${c.cloth}"/><rect x="27" y="46" width="10" height="8" rx="3" fill="${skin}"/>
<circle cx="17" cy="39" r="3.2" fill="${skin}"/><circle cx="47" cy="39" r="3.2" fill="${skin}"/><ellipse cx="32" cy="37" rx="15" ry="16" fill="${skin}"/>
${cheek}
<g>${look}<g fill="${eyeC}"><ellipse cx="26" cy="37" rx="${rx}" ry="${ry}">${blink}</ellipse><ellipse cx="38" cy="37" rx="${rx}" ry="${ry}">${blink}</ellipse></g>${shine}${wing}${brow}</g>
${mouth}${front}${extra}</g></g></svg>`
}

const avatar = atom({ plugin: 'crew-avatar', key: 'avatar' } as const, 'bai')
const isBusy = atom({ plugin: 'crew-avatar', key: 'isBusy' } as const, false)

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({ name: 'crew', description: 'Pick the face of the agent beside the prompt: /crew <name or number>' })
    return next(e)
  })

  on('command.run', { command: 'crew' }, async ($, e) => {
    const q = String(e.args ?? '').trim()
    const hit = CAST.find((c, i) => q === String(i + 1) || c.name === q || c.k === q)
    if (!hit) {
      return { text: CAST.map((c, i) => `${i + 1} ${c.name}`).join('\n') + '\n\nUse /crew <name or number>.' }
    }
    await update($, avatar, () => hit.k)
    return { text: `Now ${hit.name}.` }
  })

  on('prompt.submit', async ($, e, next) => {
    await update($, isBusy, () => true)
    return next(e)
  })
  on('turn.complete', async ($, e, next) => {
    await update($, isBusy, () => false)
    return next(e)
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (e.props.hasSurvey) return next(e)
    const { Box, Text, Button } = $.ui.resolve(e)
    const k = await read($, avatar)
    const busy = await read($, isBusy)
    const i = Math.max(0, CAST.findIndex(c => c.k === k))
    const c = CAST[i]
    const status = busy ? '处理中…' : '待命'
    const swap = (
      <Button key="swap" plain onPress={() => update($, avatar, () => CAST[(i + 1) % CAST.length].k)}>
        换一个
      </Button>
    )
    if (e.surface === 'terminal') {
      return (
        <Box>
          <Text>{c.name} · {status} </Text>
          {swap}
        </Box>
      )
    }
    const { Svg } = $.ui.resolve(e) as { Svg: any }
    return (
      <Box>
        <Svg source={face(c, busy)} alt={c.name} width={44} height={44} isInteractive />
        <Box flexDirection="column">
          <Text bold>{c.name}</Text>
          <Text dimColor>{status}</Text>
        </Box>
        {swap}
      </Box>
    )
  })
}
