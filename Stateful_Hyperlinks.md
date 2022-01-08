Context
=======

Traditional hyperlinks are usually
[URL's](https://en.wikipedia.org/wiki/URL) based on the
[DNS](https://en.wikipedia.org/wiki/Domain_Name_System) structure.

This allows the resource to be routed via DNS and specified via the URL
on the remote server.

The limitations of URL's is that they are not expressing a specific
state of the resource they represent. For news pages this means that the
content of the page could have changed. E.g. two visitors of the same
news page could see two different pages.

We need a better way to hyperlink so it's representing the state of the
resource which is linked.

Goal
----

Stateful Hyperlinks as Unique Resource Identifiers (URI's).

Success Criteria
----------------

A Stateful Hyperlink schema which links to a specific state of a
resource. Instead of a sateless hyperlink we use verification_hash as a
URI which acts also as a checksum for the retrieved revision.

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

We create stateful hyperlinks by moving from URL's to sha3-512 hashes as
URI's. These URI's are globally unique and therefore collision resistant
as the namespace is sufficiently large. By using the hashes as links we
also refer to the state of the resource. As the hash is the
page_verification_hash of the resource it allows to verify the integrity
of the resource with it.

We are referring to files with their SHA3-512 hash in this format
\[SHA3-512\|human_readable_filename\]. Displayed is the human readable
filename white it's stored with the full SHA3-512 hash which allows us
to be used as Stateful-Hyperlinks.

To allow routing between resources we can add the <domain_id> as a
prefix to the <verification_hash> resulting in the following syntax:

-   example: aqua://<domain_id>/<page_verification_hash>
