// Variantes registradas en src/Root.tsx: composición y voz de cada una. Los scripts aceptan cualquiera de estas claves.
export const VARIANTES = {
  natural: {id: 'KefirNatural', voz: 'voz-kefir-natural-v2'},
  frutado: {id: 'KefirFrutado', voz: 'voz-kefir-frutado-v2'},
  'natural-ecocultivo': {id: 'KefirNaturalEcocultivo', voz: 'voz-kefir-natural-ecocultivo'},
  'frutado-ecocultivo': {id: 'KefirFrutadoEcocultivo', voz: 'voz-kefir-frutado-ecocultivo'},
};
export const NOMBRES = Object.keys(VARIANTES).join('|');
