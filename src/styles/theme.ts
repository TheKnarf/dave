// CSS variable names for theming
export const themeVars = {
	color: {
		background: 'var(--color-background)',
		text: 'var(--color-text)',
		accent: 'var(--color-accent)',
	},
};

interface ThemeColors {
	background?: string;
	text?: string;
	accent?: string;
}

// Helper to create inline theme overrides
export function createInlineTheme(vars: ThemeColors): Record<string, string> {
	const style: Record<string, string> = {};
	if (vars.background) style['--color-background'] = vars.background;
	if (vars.text) style['--color-text'] = vars.text;
	if (vars.accent) style['--color-accent'] = vars.accent;
	return style;
}
