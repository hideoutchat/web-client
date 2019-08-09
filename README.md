# Hideout for Web Browsers

```
+--------------------------------------------+
|                                            |
| [_]             HIDEOUT.CHAT               |
|  |                                         |
| [_]-[_]-[_]     57 48 49 53 50 45 52 53 45 |
|  |       |      43 48 4f 54 48 52 4f 55 47 |
| [_]     [_]     48 54 48 45 54 52 45 45 53 |
|                                            |
+--------------------------------------------+
```

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
   and more. All built on an encrypted peer-to-peer network!

 * Hideout rendezvous nodes form a **zero-trust network**. Anyone can host
   a rendezvous node and join the network. The only requirement for a
   public-facing rendezvous node is that it operate on a secure web socket
   using a valid X.509 certificate.

## Why build this?

At conferences like [DEF CON][10], I meet lots of people. At DEF CON,
in particular, there is a strong sense of community and collaboration.
The conference is designed around problem-solving, contests, and
puzzles. Teams organize around a problem, share information and work
on tackling it together, then dissipate and form new teams for the next.
This same pattern emerges in hackathons.

Sure, there are tools already out there for collaboration on short-term
projects. There are very few that fit all of the criteria that, to me,
would make an ideal tool for collaborating with people you don't really
know all that well:

 * Anonymous: It's common for people at DEF CON (or in online video games)
   to use an alias instead of a legal name. Tools that require an email
   address (even if it's a disposable one) or that only allow your display
   name to be set globally (vs on a team-by-team basis) are against the grain
   for privacy-conscious users and scenarios like this.

 * Easy to set up: Often I just need to copy/paste a small piece of
   information to send to the person next to me. It could be an invite link,
   a wi-fi password, some sample code to help them accomplish a task...
   any tool with a registration step adds time to my ability to share this
   data. For time-sensitive scenarios involving users with possibly no prior
   knowledge or use of the tool, it needs to be fast and just work.

 * Confidential: I often need to share sensitive data, with myself or with
   others. The wi-fi password at a party, an SSH key, invoices, legal
   documents... the sorts of things I don't want anyone but the intended
   recipient to see. Any tool I use for this needs to be verifiably encrypted
   end-to-end.

 * Disposable: The tool needs to be so easy to set up that using it again,
   from scratch, is no big deal. It should leave no trace on my device.

 * Free: Anything that costs money is a barrier to entry, and negates the
   "easy to set up" and "disposable" traits I want. If it's free, but also
   provided (directly) by a company with a commercial product, the incentives
   are suspiciously misaligned.

 * Open Source: Sure, OSS is not a panacea to vulnerabilities and defects,
   but it's comforting to know that a curious end-user or a security researcher
   can examine the code to verify it is working as advertised, or that
   any developer can contribute a feature or fix, or that even if the
   tool's maintainers abandon it, there is still a chance that some community
   member(s) will pick it up.

 * Decentralized: The network should be public, operated by individuals
   without a necessary trust or connection to one another. Sure, it may
   be centralized in the beginning, but as long as it is designed as an
   open protocol that anyone can join, many eventually will.

## Usage

There are a few things you should know before using Hideout:

 1. The name you choose when accessing Hideout is **not necessarily unique**.
    For example, if you want to chat with someone who says their name is "Bob",
    be mindful that there may be another "Bob" on the network. Look at the avatar
    to confirm you are chatting with the expected person.

 2. The **avatar** next to the person or group is a cryptographic fingerprint.
    When you connect with someone, make sure the avatar is **identical** for
    both you and the other person. If not, there may be a man-in-the-middle (MITM)
    and you both should reset and sign in to a different network. This risk exists
    common to any zero-knowledge key negotiation between two or more parties.

 3. You can use [Markdown][11] in your messages to add formatting.

[1]: https://img.shields.io/circleci/build/github/hideoutchat/web-client
[2]: https://circleci.com/gh/hideoutchat/web-client
[3]: https://img.shields.io/david/hideoutchat/web-client.svg
[4]: https://github.com/hideoutchat/web-client/blob/master/package.json
[5]: https://img.shields.io/david/dev/hideoutchat/web-client.svg
[6]: https://img.shields.io/github/license/hideoutchat/web-client.svg
[7]: https://github.com/hideoutchat/web-client/blob/master/LICENSE.md
[8]: https://github.com/hideoutchat/rendezvous
[9]: https://en.wikipedia.org/wiki/Forward_secrecy
[10]: https://defcon.org/
[11]: https://www.markdownguide.org/
