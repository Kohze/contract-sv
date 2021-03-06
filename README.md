<p align='center'>
    <img src='./img/contract_sv_trans.png' width=200/>
</p>

## Contract SV

BitcoinSV backed documents.

Goals of the hackathon:

- break down historic industry data silos
- make it easier for companies in different industries to interact
- make it easier to operate across geographic boundaries for businesses, organizations, and consumers
- enable consumers to interact, in a single way, with different businesses and organizations concerning their data and transactions
- improve interaction across governments and government agencies

### Problem

- Documents float around in emails. No idea how often a document was uploaded or when it was last modified.
- This is a big issue for legal contracts. You could have a 100 page pdf document and a clause gets added in right before signing and can be difficult to track or detect what has changed.

This project focuses on leveraging BitcoinSV to improve trust between human parties around shared documents and contracts.

### Usage

- Upload the document you want to track
- We'll track that document over time using a unique hash generated from the bytes/data of that document when it was uploaded.
- If you upload the same doc multiple times, we'll create a snapshot for each upload and store that hash on BitcoinSV.
- Compare existing documents against previously uploaded ones.
- Generate a unique link proving an attached document hasn't been modified. Include that link in email correspondence with your colleagues as proof.

### ContractSV

- Use the bitcoin sv blockchain to validate the proof of a document being uploaded and validated.
- Upload a document and verify it was exactly the same as a previous point in history.

### Future use cases

- Email integration
- Notarization
- Integrations with other document hosting platforms such as google docs for verification
