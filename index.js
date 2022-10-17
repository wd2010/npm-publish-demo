import { publish } from "libnpmpublish";
import pack from "libnpmpack";
import ssri from "ssri";
import crypto from "crypto";
import t from 'tap';
import {v4 as uuidV4} from 'uuid';


const id = uuidV4().slice(0, 8)
const pkgVersion = '1.0.1'



const testDir = t.testdir({
  'package.json': JSON.stringify({
    name: `mypack-${id}`,
    version: pkgVersion,
  }, null, 2),
  'index.js': 'hello',
})

const manifest = {
  name: `mypack-${id}`,
  version: "1.0.0",
  description: "some stuff",
};

const tarData = await pack(testDir, {});
const shasum = crypto.createHash("sha1").update(tarData).digest("hex");
const integrity = ssri.fromData(tarData, { algorithms: ["sha512"] });
const packument = {
  _id: `mypack-${id}`,
  name: `mypack-${id}`,
  description: "some stuff",
  "dist-tags": {
    latest: pkgVersion,
  },
  versions: {
    pkgVersion: {
      _id: "mypack@1.0.0",
      _nodeVersion: process.versions.node,
      name: `mypack-${id}`,
      version: pkgVersion,
      description: "some stuff",
      dist: {
        shasum,
        integrity: integrity.toString(),
        tarball: `https://registry.npmjs.org/mypack-${id}/-/mypack-${id}-${pkgVersion}.tgz`,
      },
    },
  },
  access: "public",
  _attachments: {
    [`mypack-${id}-${pkgVersion}.tgz`]: {
      content_type: "application/octet-stream",
      data: tarData.toString("base64"),
      length: tarData.length,
    },
  },
};

const result = await publish(manifest, tarData, {
  access: 'public',
  forceAuth: {

    token: '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'
  }
})

console.log(result);
