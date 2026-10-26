# Preparazione pubblicazione GCM V68 — 224.1.33

## Contesto
- Il sito commerciale esistente punta alla release pubblica Windows `v224.1.32` (16 ottobre 2026).
- Il nuovo candidato GCM V68 viene compilato come `224.1.33`, per evitare di sovrascrivere o confondere il vecchio file con uno diverso con lo stesso nome.
- Questa PR **non pubblica** installer `224.1.33` e non modifica Firebase.

## Prima di attivare il nuovo download
- [ ] Verificare che la PR dell'applicazione GCM-gestionale/GCM-gestionale#4 sia revisionata e integrata solo dopo approvazione.
- [ ] Salvare backup funzionanti dei dati Firestore, delle regole, delle Functions e dei file Hosting.
- [ ] Verificare il token App Check su browser reale in `gcm-online.web.app` e `gcm-istruttori-gcm-20261023.web.app`.
- [ ] Verificare deploy, autorizzazioni ed error handling di `gcmRejectFieldRequest` prima di abilitare il comando Rifiuta.
- [ ] Collaudare login, Agenda, prenotazioni, annullamenti e richieste campo con account di prova e dati sintetici.
- [ ] Provare `GCM_Setup_Windows_x64_224.1.33.exe` su Windows isolato e verificare che non intacchi l'installazione di lavoro.
- [ ] Confermare checksum SHA-256 e commit del manifest della compilazione GitHub.
- [ ] Preparare release `v224.1.33` **inizialmente in bozza** con EXE e manifest. Pubblicarla solo dopo approvazione.
- [ ] Aggiornare il collegamento di download del sito alla nuova release, verificando che il link esista, il file scaricato corrisponda al checksum e che sia recuperabile la versione precedente.
- [ ] Controllare l'aggiornamento di entrambi gli eventuali siti commerciali (GitHub Pages e Firebase Hosting); non assumere che condividano lo stesso deploy.

## Nota
Gli esiti dei test automatici e della build **non equivalgono** a un collaudo completo del programma installato o dei servizi Firebase reali.
