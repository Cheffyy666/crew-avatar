# crew-avatar

A Claude Code mod that shows a bar with an animated avatar above the prompt box. The avatar blinks, looks around and hops now and then; while Claude is working it hops continuously. While working, the avatar raises its eyebrows and opens its mouth; when idle it smiles. A "换一个" (swap) button cycles to the next face.

## Usage

Switch the avatar with the `/crew` command:

- `/crew` lists the available faces (numbered): 总指挥, 小白, 小依, 小娅.
- `/crew <name or number>` picks one, e.g. `/crew 2` or `/crew 小白`.

Or click the "换一个" button in the bar to cycle through them.

## Install

At the prompt of a terminal session:

```
/plugin install crew-avatar --marketplace Cheffyy666/crew-avatar
```

From a shell:

```
claude plugin install crew-avatar --marketplace Cheffyy666/crew-avatar
```

In the desktop app, where `/plugin` does not run: click + next to the prompt box, then Plugins, Add marketplace with `Cheffyy666/crew-avatar`, then Add plugin.

When asked `Add marketplace?`, answer `y`, then pick a scope.

## License

MIT
