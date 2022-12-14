# n8n-nodes-miniflux

An [n8n](https://github.com/n8n-io/n8n) node for [Miniflux v2](https://github.com/miniflux/v2). 

n8n is a workflow automation platform, making sure you'll never have to do all these tedious and boring manual tasks again. Miniflux is the only RSS reader you'll ever need. This node brings both tools together.

So far the node can fetch your feeds, categories, and entries (with some of the filters supported by Miniflux). It can also update entries (mark them as read/unread). Going forward I plan to implement additional functionality from the [Miniflux API](https://miniflux.app/docs/api.html) and possibly add bonus features such as converting HTML content into plain text on the fly as part of the [n8n node-athon](https://n8n.io/n8n-node-athon/).

# Installation

* [Installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) for n8n community nodes
* Enter `n8n-nodes-miniflux` when n8n asks for the package name to install
* In Miniflux, head to *Settings* > *API Keys* > *Create a new API key* in order to retrieve the API key required to authenticate

# Requirements

* n8n version 0.189.0 or later
* Miniflux v2

# Preview

![Screenshot](./img/screenshot.png)

# Changelog

## 0.0.7

* Added *Plain Text* option. Converts HTML `content` into plain text `content_plain` when enabled.
* Order options alphabetically, renamed *Direction* into *Order Direction*
* Updated screenshot

## 0.0.6

* Merged *Feed Entry* and *Entry* resources together under *Entry*
