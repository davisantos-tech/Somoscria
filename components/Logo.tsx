// Wordmark "Cria" com o ponto do "i" estilizado como um círculo laranja
// separado — conceito do moodboard da marca (C + i + seta = conexão,
// pessoa, direção). Construído em CSS puro (não depende de onde a fonte
// posiciona o pingo natural do "i", que varia entre fontes/browsers): usa
// um "ı" sem pingo (U+0131) e desenha o círculo à parte, sempre no mesmo
// lugar.
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display inline-flex items-center font-semibold tracking-tight ${className}`}
    >
      Cr
      <span className="relative mx-[0.02em] inline-block">
        ı
        <span
          aria-hidden="true"
          className="absolute -top-[0.62em] left-1/2 h-[0.22em] w-[0.22em] -translate-x-1/2 rounded-full bg-brand"
        />
      </span>
      a
    </span>
  );
}
