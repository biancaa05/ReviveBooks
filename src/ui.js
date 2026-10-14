const btnBase = 'inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full border font-semibold text-[0.92rem] whitespace-nowrap cursor-pointer no-underline transition-[background-color,border-color,box-shadow,transform] duration-200'

export const ui = {
  btn: `${btnBase} border-transparent bg-brand text-white hover:bg-brand-2 hover:-translate-y-px hover:shadow-lift active:translate-y-0`,
  btnOutline: `${btnBase} border-line-2 bg-transparent text-brand hover:border-brand hover:bg-brand-wash disabled:opacity-55 disabled:cursor-default disabled:hover:bg-transparent disabled:hover:border-line-2`,
  sm: 'h-[38px]! px-4! text-[0.86rem]!',
  panel: 'bg-white border border-line rounded-[20px]',
  eyebrow: 'flex items-center gap-1.5 text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-brand-3 mb-2.5',
  pill: 'inline-flex items-center gap-1.5 h-7 px-3 rounded-full bg-brand-soft text-brand text-[0.78rem] font-semibold',
  label: 'text-[0.8rem] font-semibold text-ink-2',
  input: 'w-full bg-white border border-line-2 rounded-[10px] px-3.5 py-[11px] text-[0.95rem] text-ink placeholder:text-[#9aa59d] transition-[border-color,box-shadow] focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10',
  avatar: 'shrink-0 grid place-items-center rounded-full text-white font-display text-xl',
  empty: 'flex flex-col items-center gap-3 py-16 px-5 text-center text-muted border border-dashed border-line-2 rounded-[20px]',
  sectionTitle: 'font-ui text-[0.75rem] font-semibold tracking-[0.14em] uppercase text-muted mb-3.5',
}
