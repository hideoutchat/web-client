# Hideout for Web Browsers

[![CircleCI][1]][2]
[![dependencies][3]][4]
[![devDependencies][5]][4]
[![license][6]][7]

The official web client for Hideout.chat.

## What is Hideout?

The vision is simple: a safe place to meet and collaborate.

Hideout consists of a set of complementary technologies that
create a secure way for two or more strangers to communicate.

 * A Hideout network consists of one or more [rendezvous][8] nodes.
   These nodes gossip to one another about messages they receive from
   other nodes, including from end-users using a Hideout-compatible app.

 * The Hideout protocol describes how clients may structure messages
   they send over a network in a way that resists spoofing (authenticity),
   tampering (integrity), and information disclosure (confidentiality).
   Additionally, the protocol provides sequencing and [Forward Secrecy][9]
   via sequence-based key derivation.

 * Atop the foundation of the Hideout protocol, the Hideout web app
   provides app-layer features and a UI to enable secure collaboration.
   Among these are emoji reactions, group chats, file and image sharing,
   and more. All built on an end-to-end encrypted secure network!

 * Hideout rendezvous nodes form a **zero-trust network**. Anyone can host
   a rendezvous node and join the network. The only requirement for a
   public-facing rendezvous node is that it operate on a secure web socket
   using a valid X.509 certificate.

[1]: https://img.shields.io/circleci/build/github/hideoutchat/web-client
[2]: https://circleci.com/gh/hideoutchat/web-client
[3]: https://img.shields.io/david/hideoutchat/web-client.svg
[4]: https://github.com/hideoutchat/web-client/blob/master/package.json
[5]: https://img.shields.io/david/dev/hideoutchat/web-client.svg
[6]: https://img.shields.io/github/license/hideoutchat/web-client.svg
[7]: https://github.com/hideoutchat/web-client/blob/master/LICENSE.md
[8]: https://github.com/hideoutchat/rendezvous
[9]: https://en.wikipedia.org/wiki/Forward_secrecy
