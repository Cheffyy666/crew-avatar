import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

type Look = {
  k: string; name: string; bg: string; skin: string; hair: string; cloth: string
  style: 'short' | 'long' | 'wild' | 'bald' | 'turban' | 'bicorne' | 'beret' | 'straw'
  hat?: string; beard?: string; stache?: string; glasses?: boolean; ear?: boolean; cheek?: boolean; brow?: boolean; flower?: string
}

const CAST: Look[] = [
  { k: 'napoleon', name: '拿破仑', bg: '#C9D4F2', skin: '#F2C9A5', hair: '#5A3A22', cloth: '#27408B', style: 'bicorne', hat: '#1B1B22' },
  { k: 'vango', name: '梵高', bg: '#F7D98B', skin: '#F0BC94', hair: '#D8622B', cloth: '#3E6FB0', style: 'straw', hat: '#E3B94F', beard: '#D8622B' },
  { k: 'pearl', name: '珍珠耳环少女', bg: '#2E3A55', skin: '#F4CDAE', hair: '#6A4A2E', cloth: '#C9A234', style: 'turban', hat: '#3C70B8', ear: true, cheek: true },
  { k: 'lisa', name: '蒙娜丽莎', bg: '#9DB38A', skin: '#E7BE96', hair: '#2C1E16', cloth: '#3B3A32', style: 'long', cheek: true },
  { k: 'wild', name: '老教授', bg: '#B9D6E8', skin: '#F2CFB4', hair: '#ECECEC', cloth: '#586B8C', style: 'wild', stache: '#D9D9D9' },
  { k: 'frida', name: '弗里达', bg: '#F1B7A5', skin: '#D6A07C', hair: '#1D1414', cloth: '#2F8A6B', style: 'long', flower: '#E0476B', brow: true, ear: true },
  { k: 'rembrandt', name: '伦勃朗', bg: '#D9C6A0', skin: '#E9B98F', hair: '#7C6A55', cloth: '#2A2420', style: 'beret', hat: '#1E1A18', stache: '#7C6A55' },
  { k: 'eng', name: '工程师', bg: '#BFE3D6', skin: '#B9825E', hair: '#1B1B1B', cloth: '#E8ECF2', style: 'short', glasses: true },
]

function face(c: Look, busy: boolean): string {
  const { skin, hair } = c
  const hat = c.hat ?? hair
  let back = ''
  let front = ''
  if (c.style === 'long') back = `<path d="M13 44c-1-20 7-30 19-30s20 10 19 30l1 16H12z" fill="${hair}"/>`
  if (c.style === 'wild') back = `<g fill="${hair}"><circle cx="17" cy="28" r="9"/><circle cx="47" cy="28" r="9"/><circle cx="23" cy="18" r="10"/><circle cx="41" cy="18" r="10"/><circle cx="32" cy="15" r="10"/></g>`
  if (c.style === 'short' || c.style === 'long') front = `<path d="M17 36c-1-14 6-21 15-21s16 7 15 21c-3-7-8-10-15-10s-12 3-15 10z" fill="${hair}"/>`
  if (c.style === 'wild') front = `<path d="M18 33c0-10 6-14 14-14s14 4 14 14c-4-5-8-7-14-7s-10 2-14 7z" fill="${hair}"/>`
  if (c.style === 'turban') front = `<path d="M16 33c-1-15 6-23 16-23s17 8 16 23c-5-4-10-5-16-5s-11 1-16 5z" fill="${hat}"/><path d="M17 29c8-4 22-4 30 0" stroke="#E8C547" stroke-width="3" fill="none"/>`
  if (c.style === 'bicorne') front = `<path d="M17 36c-1-12 5-17 15-17s16 5 15 17c-3-5-8-7-15-7s-12 2-15 7z" fill="${hair}"/><path d="M5 25c10-14 44-14 54 0-12-5-42-5-54 0z" fill="${hat}"/><path d="M15 27c2-11 32-11 34 0z" fill="${hat}"/><circle cx="32" cy="22" r="2.2" fill="#E8C547"/>`
  if (c.style === 'beret') front = `<ellipse cx="34" cy="20" rx="17" ry="7" fill="${hat}" transform="rotate(-8 34 20)"/><rect x="31" y="11" width="4" height="5" rx="2" fill="${hat}"/>`
  if (c.style === 'straw') front = `<ellipse cx="32" cy="25" rx="26" ry="5.5" fill="${hat}"/><path d="M20 25c0-9 5-13 12-13s12 4 12 13z" fill="${hat}"/>`
  const flower = c.flower ? `<g fill="${c.flower}"><circle cx="22" cy="19" r="3"/><circle cx="27" cy="16" r="3"/></g>` : ''
  const beard = c.beard ? `<path d="M18 40c0 15 28 15 28 0-4 6-8 9-14 9s-10-3-14-9z" fill="${c.beard}"/>` : ''
  const stache = c.stache ? `<path d="M25 43.5c3-2.6 11-2.6 14 0-3 2.6-11 2.6-14 0z" fill="${c.stache}"/>` : ''
  const glasses = c.glasses ? `<g fill="none" stroke="#1E2230" stroke-width="1.6"><circle cx="26" cy="36" r="5"/><circle cx="38" cy="36" r="5"/><path d="M31 36h2"/></g>` : ''
  const ear = c.ear ? `<circle cx="16.5" cy="44" r="2" fill="#F5F2EA"/>` : ''
  const cheek = c.cheek ? `<g fill="#F08C8C" opacity=".45"><circle cx="22" cy="42" r="3"/><circle cx="42" cy="42" r="3"/></g>` : ''
  const by = busy ? 28.5 : 30.5
  const mouth = busy
    ? `<ellipse cx="32" cy="46.8" rx="2" ry="2.4" fill="#7A3E32"/>`
    : `<path d="M28.5 45.5q3.5 2.6 7 0" stroke="#7A3E32" stroke-width="1.6" fill="none" stroke-linecap="round"/>`
  const brow = `<path d="M22 ${by}q4-2.6 8 0M34 ${by}q4-2.6 8 0" stroke="rgba(0,0,0,.4)" stroke-width="${c.brow ? 2 : 1.4}" fill="none" stroke-linecap="round"/>`
  const blink = `<animate attributeName="ry" values="2.9;2.9;0.3;2.9" keyTimes="0;0.93;0.96;1" dur="4.8s" repeatCount="indefinite"/>`
  const look = `<animateTransform attributeName="transform" type="translate" values="0 0;1.6 0;1.6 0;-1.6 .6;-1.6 .6;0 0" keyTimes="0;.2;.4;.6;.8;1" dur="7s" repeatCount="indefinite"/>`
  const hop = busy
    ? `<animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="0.8s" repeatCount="indefinite"/>`
    : `<animateTransform attributeName="transform" type="translate" values="0 0;0 0;0 -5;0 0;0 0" keyTimes="0;.9;.94;.98;1" dur="6s" repeatCount="indefinite"/>`
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="44" height="44"><defs><clipPath id="c"><circle cx="32" cy="32" r="32"/></clipPath></defs>
<g clip-path="url(#c)"><rect width="64" height="64" fill="${c.bg}"/><g>${hop}
${back}<path d="M10 66c0-11 9-15 22-15s22 4 22 15z" fill="${c.cloth}"/><rect x="27" y="46" width="10" height="8" rx="3" fill="${skin}"/>
<circle cx="17" cy="39" r="3.2" fill="${skin}"/><circle cx="47" cy="39" r="3.2" fill="${skin}"/><ellipse cx="32" cy="37" rx="15" ry="16" fill="${skin}"/>
${cheek}${ear}${beard}
<g>${look}<g fill="#1E2230"><ellipse cx="26" cy="37" rx="2.1" ry="2.9">${blink}</ellipse><ellipse cx="38" cy="37" rx="2.1" ry="2.9">${blink}</ellipse></g>${brow}</g>
${glasses}${mouth}${stache}${front}${flower}</g></g></svg>`
}

const avatar = atom({ plugin: 'crew-avatar', key: 'avatar' } as const, 'eng')
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
