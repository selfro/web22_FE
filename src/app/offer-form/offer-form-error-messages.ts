export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) {
  }
}

export const OfferFormErrorMessages = [

  new ErrorMessage('lva', 'required', 'Bitte gib einen LVA-Titel ein!'),
  new ErrorMessage('date', 'required', 'Bitte gib ein Datum ein!'),
  new ErrorMessage('date', 'dateFormat', 'Bitte gib ein zukünftiges Datum ein!'),
  new ErrorMessage('start', 'required', 'Bitte gib eine Start-Uhrzeit ein!'),
  new ErrorMessage('end', 'required', 'Bitte gib eine End-Uhrzeit ein!'),
  new ErrorMessage('message', 'required', 'Bitte gib einen Text ein!')
];
