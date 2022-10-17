import { publish } from "libnpmpublish";
import pack from "libnpmpack";
import ssri from "ssri";
import crypto from "crypto";
import {v4 as uuidV4} from 'uuid';
import path, {dirname} from 'path';
import {fileURLToPath} from 'url';

const publishPkg = async ({description = 'pkg 的描述信息', authToken}) => {
try {
  const id = uuidV4().slice(0, 8)
  const pkgVersion = '1.0.0'
  const pkgName = `kzx-${id}`
  const keywords = ['这是包的关键字']
  
  const manifest = {
    name: pkgName,
    version: pkgVersion,
    description,
    keywords
  };
  
  const __dirname = dirname(fileURLToPath(import.meta.url))
  const pkgPath = path.join(__dirname, 'pkg')
  
  const tarData = await pack(pkgPath, {});
  const shasum = crypto.createHash("sha1").update(tarData).digest("hex");
  const integrity = ssri.fromData(tarData, { algorithms: ["sha512"] });
  const packument = {
    _id: pkgName,
    name: pkgName,
    description,
    "dist-tags": {
      latest: pkgVersion,
    },
    versions: {
      pkgVersion: {
        _nodeVersion: process.versions.node,
        name: pkgName,
        version: pkgVersion,
        description,
        dist: {
          shasum,
          integrity: integrity.toString(),
          tarball: `https://registry.npmjs.org/${pkgName}/-/${pkgName}-${pkgVersion}.tgz`,
        },
      },
    },
    access: "public",
    _attachments: {
      [`${pkgName}-${pkgVersion}.tgz`]: {
        content_type: "application/octet-stream",
        data: tarData.toString("base64"),
        length: tarData.length,
      },
    },
  };
  
  const result = await publish(manifest, tarData, {
    forceAuth: {
      token: authToken
    }
  })

  console.log('publish 成功')

} catch (e) {
  console.log('publish 失败')
}

}

publishPkg({authToken: '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'})