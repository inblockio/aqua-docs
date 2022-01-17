Context
=======

Traditional hyperlinks are usually
[URL's](https://en.wikipedia.org/wiki/URL) based on the
[DNS](https://en.wikipedia.org/wiki/Domain_Name_System) structure.

This allows the resource to be routed via DNS and specified via the URL
on the remote server.

The limitations of URL's is that they are not expressing a specific
state of the resource they represent. There is no way to verify if the content
of the page is consistant with the content of the page who send a URL.
For news pages this means that the content of the page could have changed. E.g.
two visitors of the same news page could see two different pages.

We need a better way to hyperlink so it's sure, that what is linked
is consistant across domains and users. Therefore we introduce Aqua URI's which are
used to enable the receive to verify the state of the ressource.

Goal
----

Use Immutable Hyperlinks as Unique Resource Identifiers (URI's) to allow
a consistant referenciation of ressources with the ability to verify them with the AQP.

Success Criteria
----------------

A Immutable Hyperlink schema which links to a specific state of a
resource. Instead of a stateless hyperlink we use verification_hash as a
URI which acts as the checksum to verify the retrieved revision.

Input
-----

-   file upload wizard is executed with file-data and description as
    input
-   file is stored with in the service triggering a hook leading to the
    calculation of
-   verification_hash (calculated with the file as input for
    content_hash) which is stored in the revision_object (file or
    database)

Output
######

When linking the file it's displayed in the following format: \[SHA3-512
Hash\|Descriptor Text\]

Boundary conditions
-------------------

-   File is too big to be hashed. We support currently up to 50 MB.
-   File can't be hashed for some reason (error during the process to
    due an unexpected code execution)
-   File is empty (has no content)

Implementation
--------------

We create Immutable Hyperlinks by moving from URL's to sha3-512 hashes as
URI's. These URI's are globally unique and therefore collision resistant
as the namespace is sufficiently large. By using the hashes as links we
also refer to the state of the resource. As the hash is the
verification_hash of the resource it allows us to verify the integrity
of the resource with it.

We are referring to files with their SHA3-512 hash in this format
\[SHA3-512\|human_readable_filename\]. Displayed is the human readable
filename white it's stored with the full SHA3-512 hash which allows us
to be used as Immutable Hyperlinks.

To allow routing between resources we can add the <domain_id> as a
prefix to the <verification_hash> resulting in the following syntax:

`example: aqua://<domain_id>/<page_verification_hash>`

Note: Implementatstion specific to aqua-PKC:
- The verification_hash is stored in the content-slot 'transclusion hashes' with the internal links which referne the ressource.
