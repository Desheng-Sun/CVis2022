import * as d3 from "d3";
import "./index.css";
import { table } from "@observablehq/inputs";
import { useEffect, useState } from "react";
import { html } from "htl";
import PubSub from "pubsub-js";

import { getDetialListSds } from "../../apis/api.js";

let nodeColumns = [
  "numId",
  "name",
  "type",
  "industry",
  "isCore",
  "r_cert_chain",
  "r_cert",
  "r_whois_name",
  "r_whois_phone",
  "r_whois_email",
  "r_cname",
  "r_request_jump",
  "r_subdomain",
  "r_dns_a",
  "r_cidr",
  "r_asn",
  "id",
];

let linkColumns = ["relation", "isCore", "source", "target"];

let nodesLinksInfo = {
  nodes: [
    {
      numId: 7057,
      id: "Domain_928f2139fe04b2bf2870653bee7b25d2f0fc3b6aec6dab114270f13dd6f1a661",
      name: "928f2139fe.com",
      type: "Domain",
      industry: "ABCE\r",
      children: [
        {
          numId: 7057,
          id: "Domain_928f2139fe04b2bf2870653bee7b25d2f0fc3b6aec6dab114270f13dd6f1a661",
          name: "928f2139fe.com",
          type: "Domain",
          industry: "ABCE\r",
        },
      ],
    },
    {
      numId: 7390,
      id: "Domain_907c85959c86607942216550c3de8354867a819ded2381564baa79bcfc5c501c",
      name: "907c85959c.com",
      type: "Domain",
      industry: "B\r",
      children: [
        {
          numId: 7390,
          id: "Domain_907c85959c86607942216550c3de8354867a819ded2381564baa79bcfc5c501c",
          name: "907c85959c.com",
          type: "Domain",
          industry: "B\r",
        },
      ],
    },
    {
      numId: 7409,
      id: "Domain_0744ccb1518874480b28e618e16310201b29b251d4542151276e8c3e397f7bb7",
      name: "0744ccb151.com",
      type: "Domain",
      industry: "  \r",
      children: [
        {
          numId: 7409,
          id: "Domain_0744ccb1518874480b28e618e16310201b29b251d4542151276e8c3e397f7bb7",
          name: "0744ccb151.com",
          type: "Domain",
          industry: "  \r",
        },
      ],
    },
    {
      numId: 7351,
      id: "Domain_c67f6b5008e928fa7116bdeed7b2c5630320caa3a73a9e506492514906292a04",
      name: "c67f6b5008.com",
      type: "Domain",
      industry: "BC\r",
      children: [
        {
          numId: 7351,
          id: "Domain_c67f6b5008e928fa7116bdeed7b2c5630320caa3a73a9e506492514906292a04",
          name: "c67f6b5008.com",
          type: "Domain",
          industry: "BC\r",
        },
      ],
    },
    {
      numId: 7090,
      id: "Domain_4d95d911bd480be98e6942eec658172c9409b6ac7acc674f7ca6d6c6bed10505",
      name: "4d95d911bd.com",
      type: "Domain",
      industry: "ABCE\r",
      children: [
        {
          numId: 7090,
          id: "Domain_4d95d911bd480be98e6942eec658172c9409b6ac7acc674f7ca6d6c6bed10505",
          name: "4d95d911bd.com",
          type: "Domain",
          industry: "ABCE\r",
        },
      ],
    },
    {
      numId: 7052,
      id: "Domain_8188ec8efa2d02304c6f57e6cfccb6f3c97bd755be2cc02a8fa32299773999ae",
      name: "8188ec8efa.com",
      type: "Domain",
      industry: "  \r",
      children: [
        {
          numId: 7052,
          id: "Domain_8188ec8efa2d02304c6f57e6cfccb6f3c97bd755be2cc02a8fa32299773999ae",
          name: "8188ec8efa.com",
          type: "Domain",
          industry: "  \r",
        },
      ],
    },
    {
      numId: 109,
      id: "Domain_a3c5aacfa6ba368db872b232d67378247cf1995ad48905a967d6df56d4915e20",
      name: "a3c5aacfa6.com",
      type: "Domain",
      industry: "ABCE\r",
      children: [
        {
          numId: 109,
          id: "Domain_a3c5aacfa6ba368db872b232d67378247cf1995ad48905a967d6df56d4915e20",
          name: "a3c5aacfa6.com",
          type: "Domain",
          industry: "ABCE\r",
        },
      ],
    },
    {
      numId: 7463,
      id: "Domain_d530e3a2cf4d92cbc7ec553bab52282f82a5eec8fb0302be87b7f80206fbb6f9",
      name: "d530e3a2cf.com",
      type: "Domain",
      industry: "  \r",
      children: [
        {
          numId: 7463,
          id: "Domain_d530e3a2cf4d92cbc7ec553bab52282f82a5eec8fb0302be87b7f80206fbb6f9",
          name: "d530e3a2cf.com",
          type: "Domain",
          industry: "  \r",
        },
      ],
    },
    {
      numId: 7105,
      id: "Domain_2a36e45a77016ba33860907196d8748ad3b6faec9dbb4047805c4cc4fc45fc49",
      name: "2a36e45a77.com",
      type: "Domain",
      industry: "A\r",
      children: [
        {
          numId: 7105,
          id: "Domain_2a36e45a77016ba33860907196d8748ad3b6faec9dbb4047805c4cc4fc45fc49",
          name: "2a36e45a77.com",
          type: "Domain",
          industry: "A\r",
        },
      ],
    },
    {
      numId: 267579,
      id: "Domain_ade88461cdc0ab433d4064d8eb4f3a1e2f516f370894077468b861c0171bf974",
      name: "ade88461cd.com",
      type: "Domain",
      industry: "B\r",
      children: [
        {
          numId: 267579,
          id: "Domain_ade88461cdc0ab433d4064d8eb4f3a1e2f516f370894077468b861c0171bf974",
          name: "ade88461cd.com",
          type: "Domain",
          industry: "B\r",
        },
      ],
    },
    {
      numId: 3,
      id: "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
      name: "5.180.xxx.xxx",
      type: "IP",
      industry: "  \r",
    },
    {
      numId: 4,
      id: "Cert_9ace6aae20e3ac6d9ebfae8938b91112460b27ad204cf11f1301f154c5d309a4",
      name: "9ace6aae20",
      type: "Cert",
      industry: "  \r",
    },
    {
      numId: 1,
      id: "Domain_34a6231f101fdfa2b051beaa4b94d463fe5f9f42b7789bbe60f6fd4c292ee7ac",
      name: "34a6231f10.com",
      type: "Domain",
      industry: "ABCE\r",
    },
    {
      numId: 2,
      id: "Domain_5052db3f33d5337ab631025f7d5de3c5ac559edb2c40deda5530c0051f39b1e2",
      name: "5052db3f33.com",
      type: "Domain",
      industry: "ABCE\r",
    },
    {
      numId: 7,
      id: "Domain_d3d0abc4c07c370e8c7413efd154a05a602e5e209ae942850345b2ac56fddbcc",
      name: "d3d0abc4c0.com",
      type: "Domain",
      industry: "  \r",
    },
    {
      numId: 16,
      id: "Domain_6f51b90ab3ab80b45407724da4f21428fc679ab578242223ba6be8020bd6b2c0",
      name: "6f51b90ab3.com",
      type: "Domain",
      industry: "ABCE\r",
    },
    {
      numId: 17,
      id: "Domain_aa63f2ee01dd38d4ca451e6fa4ce08c67b5d52a64cf291969e6be7c48b6f9edd",
      name: "aa63f2ee01.com",
      type: "Domain",
      industry: "  \r",
    },
    {
      numId: 18,
      id: "Domain_c6fb2192fe6ba2de0f1258c168f34382df63658359ee831bbda9f669db2e0499",
      name: "c6fb2192fe.com",
      type: "Domain",
      industry: "ABCE\r",
    },
    {
      numId: 19,
      id: "ASN_3bc5b0706c3df8182f7784cafa0bd864c4a6d432266863609f1f5c22c47fa04b",
      name: "AS_3bc5b0706c",
      type: "ASN",
      industry: "  \r",
    },
    {
      numId: 20,
      id: "Domain_47e5873650de508c8d9a8cdeef87c5a5536decc8b49ed2b0ff09e9b58c04dd26",
      name: "47e5873650.com",
      type: "Domain",
      industry: "ABCE\r",
    },
    {
      numId: 21,
      id: "Domain_e9906a199dc5060fd8673b70cf1b7e7ffc4aa318fca6c6a8bf7d654e0447e3b1",
      name: "e9906a199d.com",
      type: "Domain",
      industry: "ABCE\r",
    },
    {
      numId: 22,
      id: "Domain_71d2570dff9ad6ff3973b83c5d9c46ee5470144111c4764165cc772e7d011e36",
      name: "71d2570dff.com",
      type: "Domain",
      industry: "ABCE\r",
    },
    {
      numId: 23,
      id: "Domain_52718967cbfce467669c66aef2e802650688697f53adf77064120e1ef4747bce",
      name: "52718967cb.com",
      type: "Domain",
      industry: "ABCE\r",
    },
    {
      numId: 24,
      id: "Domain_ca1457f910b630bf41b6fbd2193860796d7e58bd160cf3fff13a94fb0eff52ef",
      name: "ca1457f910.com",
      type: "Domain",
      industry: "ABCE\r",
    },
    {
      numId: 25,
      id: "Domain_ed5eca0681098e07e69ac7cfaabf03409e86276345aa19bf46d80f8c47a75db8",
      name: "ed5eca0681.com",
      type: "Domain",
      industry: "ABCE\r",
    },
    {
      numId: 34716,
      id: "Whois_Name_fe5804d81ae6b2bf5c9172b56a1c2536d230fc8a1d2a8bcc869422b6cbadb243",
      name: "梁xxxxx阳",
      type: "Whois_Name",
      industry: "  \r",
    },
    {
      numId: 7076,
      id: "Domain_9a485b29b746d9de085a98ca01335b0c1a8ff339f636fac69084277f10028ddd",
      name: "9a485b29b7.com",
      type: "Domain",
      industry: "ABCE\r",
    },
    {
      numId: 44,
      id: "Domain_a3322584eaabc2faa2f1da0873b04b4c9333f2553ef2537f6f2d80410790bd71",
      name: "a3322584ea.com",
      type: "Domain",
      industry: "ABCE\r",
    },
    {
      numId: 7092,
      id: "Domain_81a6e67db0a1709f448fef17e8e6ccc63c5278ecefcdf57df06212b6efc0cd0c",
      name: "81a6e67db0.com",
      type: "Domain",
      industry: "ABCE\r",
    },
    {
      numId: 56,
      id: "Domain_b0ba5ff2370e445581d1fdbc22a21a26df636ed4de08d1112a2009f1450918a2",
      name: "b0ba5ff237.com",
      type: "Domain",
      industry: "ABCE\r",
    },
    {
      numId: 72,
      id: "Domain_412f08821afd3f3db92a652e3b8df2a6e1150d99df96b754aadb0c1bda1d7ea0",
      name: "412f08821a.com",
      type: "Domain",
      industry: "ABCE\r",
    },
    {
      numId: 79,
      id: "Domain_902ed89bc74e60bb9227ce6c71997e659072458aadc885a788e91358b62cd232",
      name: "902ed89bc7.com",
      type: "Domain",
      industry: "ABCE\r",
    },
    {
      numId: 7004,
      id: "IP_CIDR_6399042623e54e0439705fde4e655b85e0beef20bc18e9eea628bbe6278f71f8",
      name: "5.180.xxx.0/24",
      type: "IP_C",
      industry: "  \r",
    },
    {
      numId: 97,
      id: "Domain_d45bbb54e15e2a270b2536db6a27808dfcf239f7d235d45a50bb6f944d72abb2",
      name: "d45bbb54e1.com",
      type: "Domain",
      industry: "ABCE\r",
    },
    {
      numId: 98,
      id: "Domain_e703113d2e370845c54cebf0866954300d94a3223b3547901a5c8d5b888ced3c",
      name: "e703113d2e.com",
      type: "Domain",
      industry: "ABCE\r",
    },
    {
      numId: 100,
      id: "Cert_a91593a45b6eceaae2a0478cc243543184d325720bc3f19f91982450b6af57e2",
      name: "a91593a45b",
      type: "Cert",
      industry: "  \r",
    },
    {
      numId: 34798,
      id: "Whois_Name_b0a2f98c3906da568052f7116140b5a52b56cabc88c885991797bc47ab12510b",
      name: "吴xxxxx江",
      type: "Whois_Name",
      industry: "  \r",
    },
    {
      numId: 7028,
      id: "Domain_4b4db6bc99ce30a3164134c02949a1f68609c39fd61e5211f01a6d51be973b7c",
      name: "4b4db6bc99.com",
      type: "Domain",
      industry: "ABCE\r",
    },
    {
      numId: 7030,
      id: "Domain_88b759b8cb08e89d77370aa1ef87be394ba498fdbca084a09334c9bf6e094ff4",
      name: "88b759b8cb.com",
      type: "Domain",
      industry: "ABCE\r",
    },
    {
      numId: 101,
      id: "Cert_9032204fc475b809ea02a4ffc7e682660892d9e9d23b7b1777d0b4f0e9a0a656",
      name: "9032204fc4",
      type: "Cert",
      industry: "  \r",
    },
    {
      numId: 5,
      id: "Domain_32b4d5d93789d5436fe729499c7b4d311742797f406a045c55cd3f7f58c6464a",
      name: "32b4d5d937.com",
      type: "Domain",
      industry: "ABCE\r",
    },
    {
      numId: 6,
      id: "Domain_70d6d09e0e5ab16df4420cd6ff62b1704e2ea516e0aaab1fd269e43a934fee74",
      name: "70d6d09e0e.com",
      type: "Domain",
      industry: "ABCE\r",
    },
    {
      numId: 8,
      id: "Domain_e970e2e4ae6537c1e115622d09bb056db4e3de916e711902ed353e7c2b5a8923",
      name: "e970e2e4ae.com",
      type: "Domain",
      industry: "ABCE\r",
    },
    {
      numId: 9,
      id: "Domain_2d3bbcec29453b6f56fb85ea28e8e5ea5fc5f5562e0f896b6b52b113a6cc1e44",
      name: "2d3bbcec29.com",
      type: "Domain",
      industry: "ABCE\r",
    },
    {
      numId: 10,
      id: "Domain_41a5458d86f6db3ceb80f9f8dde0b5a87ee44ee0aeb7edfda94a1047d80838bf",
      name: "41a5458d86.com",
      type: "Domain",
      industry: "ABCE\r",
    },
    {
      numId: 11,
      id: "Domain_e3a8e57b0b69b4f7fef7c8679ce19aec842b11671d4c9c8f72d7e7ec0ab0d753",
      name: "e3a8e57b0b.com",
      type: "Domain",
      industry: "ABCE\r",
    },
    {
      numId: 12,
      id: "Domain_ee295d27baf607dcd72d7ad52895cbc9b9d15a65f23491d4a42ec435aaf0876a",
      name: "ee295d27ba.com",
      type: "Domain",
      industry: "ABCE\r",
    },
    {
      numId: 13,
      id: "Domain_7755ee12f2a47cd68e9ede7b1e906a80667e61e53d63a758b227135bc1cadead",
      name: "7755ee12f2.com",
      type: "Domain",
      industry: "ABCE\r",
    },
    {
      numId: 14,
      id: "Domain_9bbf71ad49989e141f42613d1bf41bb85d4e0cdd538417292884ea4fd340c9ca",
      name: "9bbf71ad49.com",
      type: "Domain",
      industry: "ABCEG\r",
    },
    {
      numId: 15,
      id: "Domain_a76a96cf47d602947a8641a680cdd995dd06c4b9065713165f4f9b48aecca8b4",
      name: "a76a96cf47.com",
      type: "Domain",
      industry: "ABCE\r",
    },
    {
      numId: 102,
      id: "IP_e000e83fd5fc8045d04b96af43f55ceb1005ec6e728aba4b066eaa1b47b11789",
      name: "164.155.xxx.xxx",
      type: "IP",
      industry: "  \r",
    },
    {
      numId: 7008,
      id: "Domain_8589a8b5ff68ea48a4fd2f3060f26f16b7de026f4aeab4fda0cf3778272e55b6",
      name: "8589a8b5ff.com",
      type: "Domain",
      industry: "  \r",
    },
    {
      numId: 7042,
      id: "ASN_71889ff77e767b6385c2e0c09548b2fa3754c01817eef98f7d761368b46dd247",
      name: "AS_71889ff77e",
      type: "ASN",
      industry: "  \r",
    },
    {
      numId: 7016,
      id: "ASN_f767fa23a48f6ac1e462cfdd6c56ddde1ba293cba073d161d0070265de46a9e9",
      name: "AS_f767fa23a4",
      type: "ASN",
      industry: "  \r",
    },
    {
      numId: 7053,
      id: "IP_CIDR_2acbd77fe64c9bbdaf5d673491d44eaa54b07b4cf3f8ec078ba23134152ca198",
      name: "164.155.xxx.0/24",
      type: "IP_C",
      industry: "  \r",
    },
    {
      numId: 7031,
      id: "ASN_645c789aee7c2ee6923a919af4a10f6876f171e2c8e55fa05547184ea0eccc17",
      name: "AS_645c789aee",
      type: "ASN",
      industry: "  \r",
    },
    {
      numId: 112,
      id: "IP_cdcb3771d72a01e7845b212e74d1ca1b0e8384b79bad1da2f73c93959da5b3d2",
      name: "172.255.xxx.xxx",
      type: "IP",
      industry: "  \r",
    },
    {
      numId: 7171,
      id: "Domain_e738b2e5204bd3079c9e41d513822e9235f8bc7d7b0faa674d813d5d808d0f8d",
      name: "e738b2e520.com",
      type: "Domain",
      industry: "B\r",
    },
    {
      numId: 7048,
      id: "IP_CIDR_fcea994eb27b24a055a3c02585f04811302aea02add7f2abbdac93fd89d22e7a",
      name: "172.255.xxx.0/24",
      type: "IP_C",
      industry: "  \r",
    },
    {
      numId: 7050,
      id: "Domain_d947c1f5da6c207f2bf42ede259badc7b02c322d7ca6d0b3479d5fe2e68ac39b",
      name: "d947c1f5da.com",
      type: "Domain",
      industry: "BC\r",
    },
    {
      numId: 7183,
      id: "Domain_a78a8f0c0f0e9c9e2b37736e02a25f9ce0577918cb7ea2fa74120c190274deb0",
      name: "a78a8f0c0f.com",
      type: "Domain",
      industry: "B\r",
    },
    {
      numId: 7060,
      id: "Domain_b06ca3ce4f6aa438c18b249af6fc462a2d676c19c8507275af53d8ac6addd724",
      name: "b06ca3ce4f.com",
      type: "Domain",
      industry: "B\r",
    },
    {
      numId: 7193,
      id: "Domain_60f3b873b0faae6399ad773e37edda51e6e92e347f93e991be885f60918d5a0a",
      name: "60f3b873b0.com",
      type: "Domain",
      industry: "B\r",
    },
    {
      numId: 7073,
      id: "Domain_ba4e00c695b32914b3c2ac6e09dd9cc87740e8cb9789613bc4f6527a50746fae",
      name: "ba4e00c695.com",
      type: "Domain",
      industry: "B\r",
    },
    {
      numId: 7202,
      id: "Domain_7d0f9dde5b58e09492732438ef89991901138ba65d60d3073f50865e042fe72f",
      name: "7d0f9dde5b.com",
      type: "Domain",
      industry: "B\r",
    },
    {
      numId: 3111,
      id: "ASN_4eba77aac4cf89cf4d89ac512cebbaae9c589e31878d997f02bf320085cf07e0",
      name: "AS_4eba77aac4",
      type: "ASN",
      industry: "  \r",
    },
    {
      numId: 7084,
      id: "Domain_a14cafc1987f330396f30665b3917d01afdc455722009beb51e8e6fb6aeeaf3e",
      name: "a14cafc198.com",
      type: "Domain",
      industry: "B\r",
    },
    {
      numId: 7218,
      id: "Domain_44292b69f3110c79d4f5e9ead11352edd3dc07e28dcc03d8ea3a02560ec7fc4b",
      name: "44292b69f3.com",
      type: "Domain",
      industry: "BG\r",
    },
    {
      numId: 7095,
      id: "Domain_71b99aab24ddfaf8e80847111b80bb30f377faf5dd8a0b00fe9d3cf4439ae364",
      name: "71b99aab24.com",
      type: "Domain",
      industry: "B\r",
    },
    {
      numId: 7228,
      id: "Domain_ce7f626cb6a0cb5b72474afb5e615a58114e635832c80d9eb1e683d649b613c7",
      name: "ce7f626cb6.com",
      type: "Domain",
      industry: "B\r",
    },
    {
      numId: 7108,
      id: "Domain_750574ff59f4e2c140ce0880a93de5848f2d2429df6830e3ea64489be8a2af41",
      name: "750574ff59.com",
      type: "Domain",
      industry: "B\r",
    },
    {
      numId: 7242,
      id: "Domain_f69a4cdbff9f7ae4319dac4dbf4180b8fa7583d224b1b0d119fce12b10f57bff",
      name: "f69a4cdbff.com",
      type: "Domain",
      industry: "  \r",
    },
    {
      numId: 7116,
      id: "Domain_d802b7c03a6e9215bd81542d2d89be50ef38bfce8b351562737122742e56fab3",
      name: "d802b7c03a.com",
      type: "Domain",
      industry: "B\r",
    },
    {
      numId: 7256,
      id: "Domain_747dbfaee40207d56867f4a77143dac391ffa608e76df45d8399974bf9f88379",
      name: "747dbfaee4.com",
      type: "Domain",
      industry: "B\r",
    },
    {
      numId: 7129,
      id: "Domain_57ce03f1cfd227cf143f0ac65db7319280f49dcdbaec13694d749131c4099be2",
      name: "57ce03f1cf.com",
      type: "Domain",
      industry: "B\r",
    },
    {
      numId: 7136,
      id: "Domain_e97a8adf8a1cc633b87142566850032689d90bb57064df14c3a59039973716cd",
      name: "e97a8adf8a.com",
      type: "Domain",
      industry: "B\r",
    },
    {
      numId: 7265,
      id: "Domain_ef9f829f3971fa9312dafd7adb3545270d6ae5d8a92947b555de3541eb33a0dd",
      name: "ef9f829f39.com",
      type: "Domain",
      industry: "B\r",
    },
    {
      numId: 105,
      id: "Domain_bb9efa84372c2d54197d92b0a8d82dde5bb5473b38c6006f6d759b1324a0802a",
      name: "bb9efa8437.com",
      type: "Domain",
      industry: "ABCE\r",
    },
    {
      numId: 106,
      id: "Domain_8581808a73160e86a498bda75b9ce9343c6e9bdd4b96154e20cf4bc8e2252aba",
      name: "8581808a73.com",
      type: "Domain",
      industry: "ABCE\r",
    },
    {
      numId: 7149,
      id: "Domain_a4b490c9d5133c645c9bf81090843564e7918d23c13d7d6308a7669f190e5bdd",
      name: "a4b490c9d5.com",
      type: "Domain",
      industry: "B\r",
    },
    {
      numId: 7156,
      id: "Domain_e0308e451fd2282007f0afa40d0619f738216191d1b83d4bdcb15ad40679410c",
      name: "e0308e451f.com",
      type: "Domain",
      industry: "B\r",
    },
    {
      numId: 7038,
      id: "Domain_de3adb45941c3a23ff435b114d511d5834f61fde8d2c887b5f0e0870a12626aa",
      name: "de3adb4594.com",
      type: "Domain",
      industry: "B\r",
    },
  ],
  links: [
    {
      relation: "r_dns_a",
      source:
        "Domain_928f2139fe04b2bf2870653bee7b25d2f0fc3b6aec6dab114270f13dd6f1a661",
      target:
        "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
      linksNumId: [7057, 3],
      children: [
        {
          relation: "r_dns_a",
          source:
            "Domain_928f2139fe04b2bf2870653bee7b25d2f0fc3b6aec6dab114270f13dd6f1a661",
          target:
            "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
          linksNumId: [7057, 3],
        },
      ],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_907c85959c86607942216550c3de8354867a819ded2381564baa79bcfc5c501c",
      target:
        "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
      linksNumId: [7390, 3],
      children: [
        {
          relation: "r_dns_a",
          source:
            "Domain_907c85959c86607942216550c3de8354867a819ded2381564baa79bcfc5c501c",
          target:
            "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
          linksNumId: [7390, 3],
        },
      ],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_0744ccb1518874480b28e618e16310201b29b251d4542151276e8c3e397f7bb7",
      target:
        "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
      linksNumId: [7409, 3],
      children: [
        {
          relation: "r_dns_a",
          source:
            "Domain_0744ccb1518874480b28e618e16310201b29b251d4542151276e8c3e397f7bb7",
          target:
            "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
          linksNumId: [7409, 3],
        },
      ],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_c67f6b5008e928fa7116bdeed7b2c5630320caa3a73a9e506492514906292a04",
      target:
        "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
      linksNumId: [7351, 3],
      children: [
        {
          relation: "r_dns_a",
          source:
            "Domain_c67f6b5008e928fa7116bdeed7b2c5630320caa3a73a9e506492514906292a04",
          target:
            "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
          linksNumId: [7351, 3],
        },
      ],
    },
    {
      relation: "r_cert",
      source:
        "Domain_4d95d911bd480be98e6942eec658172c9409b6ac7acc674f7ca6d6c6bed10505",
      target:
        "Cert_9ace6aae20e3ac6d9ebfae8938b91112460b27ad204cf11f1301f154c5d309a4",
      linksNumId: [7090, 4],
      children: [
        {
          relation: "r_cert",
          source:
            "Domain_4d95d911bd480be98e6942eec658172c9409b6ac7acc674f7ca6d6c6bed10505",
          target:
            "Cert_9ace6aae20e3ac6d9ebfae8938b91112460b27ad204cf11f1301f154c5d309a4",
          linksNumId: [7090, 4],
        },
      ],
    },
    {
      relation: "r_cert",
      source:
        "Domain_8188ec8efa2d02304c6f57e6cfccb6f3c97bd755be2cc02a8fa32299773999ae",
      target:
        "Cert_9ace6aae20e3ac6d9ebfae8938b91112460b27ad204cf11f1301f154c5d309a4",
      linksNumId: [7052, 4],
      children: [
        {
          relation: "r_cert",
          source:
            "Domain_8188ec8efa2d02304c6f57e6cfccb6f3c97bd755be2cc02a8fa32299773999ae",
          target:
            "Cert_9ace6aae20e3ac6d9ebfae8938b91112460b27ad204cf11f1301f154c5d309a4",
          linksNumId: [7052, 4],
        },
      ],
    },
    {
      relation: "r_cert",
      source:
        "Domain_a3c5aacfa6ba368db872b232d67378247cf1995ad48905a967d6df56d4915e20",
      target:
        "Cert_9032204fc475b809ea02a4ffc7e682660892d9e9d23b7b1777d0b4f0e9a0a656",
      linksNumId: [109, 101],
      children: [
        {
          relation: "r_cert",
          source:
            "Domain_a3c5aacfa6ba368db872b232d67378247cf1995ad48905a967d6df56d4915e20",
          target:
            "Cert_9032204fc475b809ea02a4ffc7e682660892d9e9d23b7b1777d0b4f0e9a0a656",
          linksNumId: [109, 101],
        },
      ],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_d530e3a2cf4d92cbc7ec553bab52282f82a5eec8fb0302be87b7f80206fbb6f9",
      target:
        "IP_e000e83fd5fc8045d04b96af43f55ceb1005ec6e728aba4b066eaa1b47b11789",
      linksNumId: [7463, 102],
      children: [
        {
          relation: "r_dns_a",
          source:
            "Domain_d530e3a2cf4d92cbc7ec553bab52282f82a5eec8fb0302be87b7f80206fbb6f9",
          target:
            "IP_e000e83fd5fc8045d04b96af43f55ceb1005ec6e728aba4b066eaa1b47b11789",
          linksNumId: [7463, 102],
        },
      ],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_2a36e45a77016ba33860907196d8748ad3b6faec9dbb4047805c4cc4fc45fc49",
      target:
        "IP_e000e83fd5fc8045d04b96af43f55ceb1005ec6e728aba4b066eaa1b47b11789",
      linksNumId: [7105, 102],
      children: [
        {
          relation: "r_dns_a",
          source:
            "Domain_2a36e45a77016ba33860907196d8748ad3b6faec9dbb4047805c4cc4fc45fc49",
          target:
            "IP_e000e83fd5fc8045d04b96af43f55ceb1005ec6e728aba4b066eaa1b47b11789",
          linksNumId: [7105, 102],
        },
      ],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_ade88461cdc0ab433d4064d8eb4f3a1e2f516f370894077468b861c0171bf974",
      target:
        "IP_e000e83fd5fc8045d04b96af43f55ceb1005ec6e728aba4b066eaa1b47b11789",
      linksNumId: [267579, 102],
      children: [
        {
          relation: "r_dns_a",
          source:
            "Domain_ade88461cdc0ab433d4064d8eb4f3a1e2f516f370894077468b861c0171bf974",
          target:
            "IP_e000e83fd5fc8045d04b96af43f55ceb1005ec6e728aba4b066eaa1b47b11789",
          linksNumId: [267579, 102],
        },
      ],
    },
    {
      relation: "r_cert",
      source:
        "Domain_34a6231f101fdfa2b051beaa4b94d463fe5f9f42b7789bbe60f6fd4c292ee7ac",
      target:
        "Cert_9ace6aae20e3ac6d9ebfae8938b91112460b27ad204cf11f1301f154c5d309a4",
      linksNumId: [1, 4],
    },
    {
      relation: "r_cert",
      source:
        "Domain_5052db3f33d5337ab631025f7d5de3c5ac559edb2c40deda5530c0051f39b1e2",
      target:
        "Cert_9ace6aae20e3ac6d9ebfae8938b91112460b27ad204cf11f1301f154c5d309a4",
      linksNumId: [2, 4],
    },
    {
      relation: "r_cert",
      source:
        "Domain_d3d0abc4c07c370e8c7413efd154a05a602e5e209ae942850345b2ac56fddbcc",
      target:
        "Cert_9ace6aae20e3ac6d9ebfae8938b91112460b27ad204cf11f1301f154c5d309a4",
      linksNumId: [7, 4],
    },
    {
      relation: "r_cert",
      source:
        "Domain_6f51b90ab3ab80b45407724da4f21428fc679ab578242223ba6be8020bd6b2c0",
      target:
        "Cert_9ace6aae20e3ac6d9ebfae8938b91112460b27ad204cf11f1301f154c5d309a4",
      linksNumId: [16, 4],
    },
    {
      relation: "r_cert",
      source:
        "Domain_aa63f2ee01dd38d4ca451e6fa4ce08c67b5d52a64cf291969e6be7c48b6f9edd",
      target:
        "Cert_9ace6aae20e3ac6d9ebfae8938b91112460b27ad204cf11f1301f154c5d309a4",
      linksNumId: [17, 4],
    },
    {
      relation: "r_cert",
      source:
        "Domain_c6fb2192fe6ba2de0f1258c168f34382df63658359ee831bbda9f669db2e0499",
      target:
        "Cert_9ace6aae20e3ac6d9ebfae8938b91112460b27ad204cf11f1301f154c5d309a4",
      linksNumId: [18, 4],
    },
    {
      relation: "r_cert",
      source:
        "Domain_47e5873650de508c8d9a8cdeef87c5a5536decc8b49ed2b0ff09e9b58c04dd26",
      target:
        "Cert_9ace6aae20e3ac6d9ebfae8938b91112460b27ad204cf11f1301f154c5d309a4",
      linksNumId: [20, 4],
    },
    {
      relation: "r_cert",
      source:
        "Domain_e9906a199dc5060fd8673b70cf1b7e7ffc4aa318fca6c6a8bf7d654e0447e3b1",
      target:
        "Cert_9ace6aae20e3ac6d9ebfae8938b91112460b27ad204cf11f1301f154c5d309a4",
      linksNumId: [21, 4],
    },
    {
      relation: "r_cert",
      source:
        "Domain_71d2570dff9ad6ff3973b83c5d9c46ee5470144111c4764165cc772e7d011e36",
      target:
        "Cert_9ace6aae20e3ac6d9ebfae8938b91112460b27ad204cf11f1301f154c5d309a4",
      linksNumId: [22, 4],
    },
    {
      relation: "r_cert",
      source:
        "Domain_52718967cbfce467669c66aef2e802650688697f53adf77064120e1ef4747bce",
      target:
        "Cert_9ace6aae20e3ac6d9ebfae8938b91112460b27ad204cf11f1301f154c5d309a4",
      linksNumId: [23, 4],
    },
    {
      relation: "r_cert",
      source:
        "Domain_ca1457f910b630bf41b6fbd2193860796d7e58bd160cf3fff13a94fb0eff52ef",
      target:
        "Cert_9ace6aae20e3ac6d9ebfae8938b91112460b27ad204cf11f1301f154c5d309a4",
      linksNumId: [24, 4],
    },
    {
      relation: "r_cert",
      source:
        "Domain_ed5eca0681098e07e69ac7cfaabf03409e86276345aa19bf46d80f8c47a75db8",
      target:
        "Cert_9ace6aae20e3ac6d9ebfae8938b91112460b27ad204cf11f1301f154c5d309a4",
      linksNumId: [25, 4],
    },
    {
      relation: "r_cert",
      source:
        "Domain_88b759b8cb08e89d77370aa1ef87be394ba498fdbca084a09334c9bf6e094ff4",
      target:
        "Cert_9ace6aae20e3ac6d9ebfae8938b91112460b27ad204cf11f1301f154c5d309a4",
      linksNumId: [7030, 4],
    },
    {
      relation: "r_cert",
      source:
        "Domain_9a485b29b746d9de085a98ca01335b0c1a8ff339f636fac69084277f10028ddd",
      target:
        "Cert_9ace6aae20e3ac6d9ebfae8938b91112460b27ad204cf11f1301f154c5d309a4",
      linksNumId: [7076, 4],
    },
    {
      relation: "r_cert",
      source:
        "Domain_a3322584eaabc2faa2f1da0873b04b4c9333f2553ef2537f6f2d80410790bd71",
      target:
        "Cert_9ace6aae20e3ac6d9ebfae8938b91112460b27ad204cf11f1301f154c5d309a4",
      linksNumId: [44, 4],
    },
    {
      relation: "r_cert",
      source:
        "Domain_b0ba5ff2370e445581d1fdbc22a21a26df636ed4de08d1112a2009f1450918a2",
      target:
        "Cert_9ace6aae20e3ac6d9ebfae8938b91112460b27ad204cf11f1301f154c5d309a4",
      linksNumId: [56, 4],
    },
    {
      relation: "r_cert",
      source:
        "Domain_412f08821afd3f3db92a652e3b8df2a6e1150d99df96b754aadb0c1bda1d7ea0",
      target:
        "Cert_9ace6aae20e3ac6d9ebfae8938b91112460b27ad204cf11f1301f154c5d309a4",
      linksNumId: [72, 4],
    },
    {
      relation: "r_cert",
      source:
        "Domain_902ed89bc74e60bb9227ce6c71997e659072458aadc885a788e91358b62cd232",
      target:
        "Cert_9ace6aae20e3ac6d9ebfae8938b91112460b27ad204cf11f1301f154c5d309a4",
      linksNumId: [79, 4],
    },
    {
      relation: "r_cert",
      source:
        "Domain_d45bbb54e15e2a270b2536db6a27808dfcf239f7d235d45a50bb6f944d72abb2",
      target:
        "Cert_9ace6aae20e3ac6d9ebfae8938b91112460b27ad204cf11f1301f154c5d309a4",
      linksNumId: [97, 4],
    },
    {
      relation: "r_cert",
      source:
        "Domain_e703113d2e370845c54cebf0866954300d94a3223b3547901a5c8d5b888ced3c",
      target:
        "Cert_9ace6aae20e3ac6d9ebfae8938b91112460b27ad204cf11f1301f154c5d309a4",
      linksNumId: [98, 4],
    },
    {
      relation: "r_asn",
      source:
        "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
      target:
        "ASN_3bc5b0706c3df8182f7784cafa0bd864c4a6d432266863609f1f5c22c47fa04b",
      linksNumId: [3, 19],
    },
    {
      relation: "r_cidr",
      source:
        "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
      target:
        "IP_CIDR_6399042623e54e0439705fde4e655b85e0beef20bc18e9eea628bbe6278f71f8",
      linksNumId: [3, 7004],
    },
    {
      relation: "r_cert_chain",
      source:
        "Cert_9ace6aae20e3ac6d9ebfae8938b91112460b27ad204cf11f1301f154c5d309a4",
      target:
        "Cert_a91593a45b6eceaae2a0478cc243543184d325720bc3f19f91982450b6af57e2",
      linksNumId: [4, 100],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_34a6231f101fdfa2b051beaa4b94d463fe5f9f42b7789bbe60f6fd4c292ee7ac",
      target:
        "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
      linksNumId: [1, 3],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_5052db3f33d5337ab631025f7d5de3c5ac559edb2c40deda5530c0051f39b1e2",
      target:
        "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
      linksNumId: [2, 3],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_d3d0abc4c07c370e8c7413efd154a05a602e5e209ae942850345b2ac56fddbcc",
      target:
        "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
      linksNumId: [7, 3],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_6f51b90ab3ab80b45407724da4f21428fc679ab578242223ba6be8020bd6b2c0",
      target:
        "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
      linksNumId: [16, 3],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_aa63f2ee01dd38d4ca451e6fa4ce08c67b5d52a64cf291969e6be7c48b6f9edd",
      target:
        "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
      linksNumId: [17, 3],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_c6fb2192fe6ba2de0f1258c168f34382df63658359ee831bbda9f669db2e0499",
      target:
        "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
      linksNumId: [18, 3],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_47e5873650de508c8d9a8cdeef87c5a5536decc8b49ed2b0ff09e9b58c04dd26",
      target:
        "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
      linksNumId: [20, 3],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_e9906a199dc5060fd8673b70cf1b7e7ffc4aa318fca6c6a8bf7d654e0447e3b1",
      target:
        "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
      linksNumId: [21, 3],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_71d2570dff9ad6ff3973b83c5d9c46ee5470144111c4764165cc772e7d011e36",
      target:
        "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
      linksNumId: [22, 3],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_52718967cbfce467669c66aef2e802650688697f53adf77064120e1ef4747bce",
      target:
        "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
      linksNumId: [23, 3],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_ca1457f910b630bf41b6fbd2193860796d7e58bd160cf3fff13a94fb0eff52ef",
      target:
        "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
      linksNumId: [24, 3],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_ed5eca0681098e07e69ac7cfaabf03409e86276345aa19bf46d80f8c47a75db8",
      target:
        "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
      linksNumId: [25, 3],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_88b759b8cb08e89d77370aa1ef87be394ba498fdbca084a09334c9bf6e094ff4",
      target:
        "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
      linksNumId: [7030, 3],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_9a485b29b746d9de085a98ca01335b0c1a8ff339f636fac69084277f10028ddd",
      target:
        "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
      linksNumId: [7076, 3],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_81a6e67db0a1709f448fef17e8e6ccc63c5278ecefcdf57df06212b6efc0cd0c",
      target:
        "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
      linksNumId: [7092, 3],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_4b4db6bc99ce30a3164134c02949a1f68609c39fd61e5211f01a6d51be973b7c",
      target:
        "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
      linksNumId: [7028, 3],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_34a6231f101fdfa2b051beaa4b94d463fe5f9f42b7789bbe60f6fd4c292ee7ac",
      target:
        "Domain_5052db3f33d5337ab631025f7d5de3c5ac559edb2c40deda5530c0051f39b1e2",
      linksNumId: [1, 2],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_d3d0abc4c07c370e8c7413efd154a05a602e5e209ae942850345b2ac56fddbcc",
      target:
        "Domain_aa63f2ee01dd38d4ca451e6fa4ce08c67b5d52a64cf291969e6be7c48b6f9edd",
      linksNumId: [7, 17],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_6f51b90ab3ab80b45407724da4f21428fc679ab578242223ba6be8020bd6b2c0",
      target:
        "Domain_c6fb2192fe6ba2de0f1258c168f34382df63658359ee831bbda9f669db2e0499",
      linksNumId: [16, 18],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_c6fb2192fe6ba2de0f1258c168f34382df63658359ee831bbda9f669db2e0499",
      target:
        "Domain_6f51b90ab3ab80b45407724da4f21428fc679ab578242223ba6be8020bd6b2c0",
      linksNumId: [18, 16],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_47e5873650de508c8d9a8cdeef87c5a5536decc8b49ed2b0ff09e9b58c04dd26",
      target:
        "Domain_a3322584eaabc2faa2f1da0873b04b4c9333f2553ef2537f6f2d80410790bd71",
      linksNumId: [20, 44],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_e9906a199dc5060fd8673b70cf1b7e7ffc4aa318fca6c6a8bf7d654e0447e3b1",
      target:
        "Domain_b0ba5ff2370e445581d1fdbc22a21a26df636ed4de08d1112a2009f1450918a2",
      linksNumId: [21, 56],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_71d2570dff9ad6ff3973b83c5d9c46ee5470144111c4764165cc772e7d011e36",
      target:
        "Domain_412f08821afd3f3db92a652e3b8df2a6e1150d99df96b754aadb0c1bda1d7ea0",
      linksNumId: [22, 72],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_52718967cbfce467669c66aef2e802650688697f53adf77064120e1ef4747bce",
      target:
        "Domain_902ed89bc74e60bb9227ce6c71997e659072458aadc885a788e91358b62cd232",
      linksNumId: [23, 79],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_ca1457f910b630bf41b6fbd2193860796d7e58bd160cf3fff13a94fb0eff52ef",
      target:
        "Domain_d45bbb54e15e2a270b2536db6a27808dfcf239f7d235d45a50bb6f944d72abb2",
      linksNumId: [24, 97],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_ed5eca0681098e07e69ac7cfaabf03409e86276345aa19bf46d80f8c47a75db8",
      target:
        "Domain_e703113d2e370845c54cebf0866954300d94a3223b3547901a5c8d5b888ced3c",
      linksNumId: [25, 98],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_4b4db6bc99ce30a3164134c02949a1f68609c39fd61e5211f01a6d51be973b7c",
      target:
        "Domain_9a485b29b746d9de085a98ca01335b0c1a8ff339f636fac69084277f10028ddd",
      linksNumId: [7028, 7076],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_88b759b8cb08e89d77370aa1ef87be394ba498fdbca084a09334c9bf6e094ff4",
      target:
        "Domain_81a6e67db0a1709f448fef17e8e6ccc63c5278ecefcdf57df06212b6efc0cd0c",
      linksNumId: [7030, 7092],
    },
    {
      relation: "r_whois_name",
      source:
        "Domain_4b4db6bc99ce30a3164134c02949a1f68609c39fd61e5211f01a6d51be973b7c",
      target:
        "Whois_Name_b0a2f98c3906da568052f7116140b5a52b56cabc88c885991797bc47ab12510b",
      linksNumId: [7028, 34798],
    },
    {
      relation: "r_whois_name",
      source:
        "Domain_88b759b8cb08e89d77370aa1ef87be394ba498fdbca084a09334c9bf6e094ff4",
      target:
        "Whois_Name_fe5804d81ae6b2bf5c9172b56a1c2536d230fc8a1d2a8bcc869422b6cbadb243",
      linksNumId: [7030, 34716],
    },
    {
      relation: "r_cert",
      source:
        "Domain_32b4d5d93789d5436fe729499c7b4d311742797f406a045c55cd3f7f58c6464a",
      target:
        "Cert_9032204fc475b809ea02a4ffc7e682660892d9e9d23b7b1777d0b4f0e9a0a656",
      linksNumId: [5, 101],
    },
    {
      relation: "r_cert",
      source:
        "Domain_70d6d09e0e5ab16df4420cd6ff62b1704e2ea516e0aaab1fd269e43a934fee74",
      target:
        "Cert_9032204fc475b809ea02a4ffc7e682660892d9e9d23b7b1777d0b4f0e9a0a656",
      linksNumId: [6, 101],
    },
    {
      relation: "r_cert",
      source:
        "Domain_e970e2e4ae6537c1e115622d09bb056db4e3de916e711902ed353e7c2b5a8923",
      target:
        "Cert_9032204fc475b809ea02a4ffc7e682660892d9e9d23b7b1777d0b4f0e9a0a656",
      linksNumId: [8, 101],
    },
    {
      relation: "r_cert",
      source:
        "Domain_2d3bbcec29453b6f56fb85ea28e8e5ea5fc5f5562e0f896b6b52b113a6cc1e44",
      target:
        "Cert_9032204fc475b809ea02a4ffc7e682660892d9e9d23b7b1777d0b4f0e9a0a656",
      linksNumId: [9, 101],
    },
    {
      relation: "r_cert",
      source:
        "Domain_41a5458d86f6db3ceb80f9f8dde0b5a87ee44ee0aeb7edfda94a1047d80838bf",
      target:
        "Cert_9032204fc475b809ea02a4ffc7e682660892d9e9d23b7b1777d0b4f0e9a0a656",
      linksNumId: [10, 101],
    },
    {
      relation: "r_cert",
      source:
        "Domain_e3a8e57b0b69b4f7fef7c8679ce19aec842b11671d4c9c8f72d7e7ec0ab0d753",
      target:
        "Cert_9032204fc475b809ea02a4ffc7e682660892d9e9d23b7b1777d0b4f0e9a0a656",
      linksNumId: [11, 101],
    },
    {
      relation: "r_cert",
      source:
        "Domain_ee295d27baf607dcd72d7ad52895cbc9b9d15a65f23491d4a42ec435aaf0876a",
      target:
        "Cert_9032204fc475b809ea02a4ffc7e682660892d9e9d23b7b1777d0b4f0e9a0a656",
      linksNumId: [12, 101],
    },
    {
      relation: "r_cert",
      source:
        "Domain_7755ee12f2a47cd68e9ede7b1e906a80667e61e53d63a758b227135bc1cadead",
      target:
        "Cert_9032204fc475b809ea02a4ffc7e682660892d9e9d23b7b1777d0b4f0e9a0a656",
      linksNumId: [13, 101],
    },
    {
      relation: "r_cert",
      source:
        "Domain_9bbf71ad49989e141f42613d1bf41bb85d4e0cdd538417292884ea4fd340c9ca",
      target:
        "Cert_9032204fc475b809ea02a4ffc7e682660892d9e9d23b7b1777d0b4f0e9a0a656",
      linksNumId: [14, 101],
    },
    {
      relation: "r_cert",
      source:
        "Domain_a76a96cf47d602947a8641a680cdd995dd06c4b9065713165f4f9b48aecca8b4",
      target:
        "Cert_9032204fc475b809ea02a4ffc7e682660892d9e9d23b7b1777d0b4f0e9a0a656",
      linksNumId: [15, 101],
    },
    {
      relation: "r_cert_chain",
      source:
        "Cert_9032204fc475b809ea02a4ffc7e682660892d9e9d23b7b1777d0b4f0e9a0a656",
      target:
        "Cert_a91593a45b6eceaae2a0478cc243543184d325720bc3f19f91982450b6af57e2",
      linksNumId: [101, 100],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_32b4d5d93789d5436fe729499c7b4d311742797f406a045c55cd3f7f58c6464a",
      target:
        "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
      linksNumId: [5, 3],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_70d6d09e0e5ab16df4420cd6ff62b1704e2ea516e0aaab1fd269e43a934fee74",
      target:
        "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
      linksNumId: [6, 3],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_e970e2e4ae6537c1e115622d09bb056db4e3de916e711902ed353e7c2b5a8923",
      target:
        "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
      linksNumId: [8, 3],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_2d3bbcec29453b6f56fb85ea28e8e5ea5fc5f5562e0f896b6b52b113a6cc1e44",
      target:
        "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
      linksNumId: [9, 3],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_41a5458d86f6db3ceb80f9f8dde0b5a87ee44ee0aeb7edfda94a1047d80838bf",
      target:
        "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
      linksNumId: [10, 3],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_e3a8e57b0b69b4f7fef7c8679ce19aec842b11671d4c9c8f72d7e7ec0ab0d753",
      target:
        "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
      linksNumId: [11, 3],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_ee295d27baf607dcd72d7ad52895cbc9b9d15a65f23491d4a42ec435aaf0876a",
      target:
        "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
      linksNumId: [12, 3],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_7755ee12f2a47cd68e9ede7b1e906a80667e61e53d63a758b227135bc1cadead",
      target:
        "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
      linksNumId: [13, 3],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_9bbf71ad49989e141f42613d1bf41bb85d4e0cdd538417292884ea4fd340c9ca",
      target:
        "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
      linksNumId: [14, 3],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_a76a96cf47d602947a8641a680cdd995dd06c4b9065713165f4f9b48aecca8b4",
      target:
        "IP_37f7ed5739b43757ff23c712ae4d60d16615c59c0818bf5f2c91514c9c695845",
      linksNumId: [15, 3],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_32b4d5d93789d5436fe729499c7b4d311742797f406a045c55cd3f7f58c6464a",
      target:
        "Domain_70d6d09e0e5ab16df4420cd6ff62b1704e2ea516e0aaab1fd269e43a934fee74",
      linksNumId: [5, 6],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_70d6d09e0e5ab16df4420cd6ff62b1704e2ea516e0aaab1fd269e43a934fee74",
      target:
        "Domain_32b4d5d93789d5436fe729499c7b4d311742797f406a045c55cd3f7f58c6464a",
      linksNumId: [6, 5],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_e970e2e4ae6537c1e115622d09bb056db4e3de916e711902ed353e7c2b5a8923",
      target:
        "Domain_2d3bbcec29453b6f56fb85ea28e8e5ea5fc5f5562e0f896b6b52b113a6cc1e44",
      linksNumId: [8, 9],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_2d3bbcec29453b6f56fb85ea28e8e5ea5fc5f5562e0f896b6b52b113a6cc1e44",
      target:
        "Domain_e970e2e4ae6537c1e115622d09bb056db4e3de916e711902ed353e7c2b5a8923",
      linksNumId: [9, 8],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_41a5458d86f6db3ceb80f9f8dde0b5a87ee44ee0aeb7edfda94a1047d80838bf",
      target:
        "Domain_e3a8e57b0b69b4f7fef7c8679ce19aec842b11671d4c9c8f72d7e7ec0ab0d753",
      linksNumId: [10, 11],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_e3a8e57b0b69b4f7fef7c8679ce19aec842b11671d4c9c8f72d7e7ec0ab0d753",
      target:
        "Domain_41a5458d86f6db3ceb80f9f8dde0b5a87ee44ee0aeb7edfda94a1047d80838bf",
      linksNumId: [11, 10],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_ee295d27baf607dcd72d7ad52895cbc9b9d15a65f23491d4a42ec435aaf0876a",
      target:
        "Domain_7755ee12f2a47cd68e9ede7b1e906a80667e61e53d63a758b227135bc1cadead",
      linksNumId: [12, 13],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_9bbf71ad49989e141f42613d1bf41bb85d4e0cdd538417292884ea4fd340c9ca",
      target:
        "Domain_a76a96cf47d602947a8641a680cdd995dd06c4b9065713165f4f9b48aecca8b4",
      linksNumId: [14, 15],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_a76a96cf47d602947a8641a680cdd995dd06c4b9065713165f4f9b48aecca8b4",
      target:
        "Domain_9bbf71ad49989e141f42613d1bf41bb85d4e0cdd538417292884ea4fd340c9ca",
      linksNumId: [15, 14],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_6f51b90ab3ab80b45407724da4f21428fc679ab578242223ba6be8020bd6b2c0",
      target:
        "IP_e000e83fd5fc8045d04b96af43f55ceb1005ec6e728aba4b066eaa1b47b11789",
      linksNumId: [16, 102],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_c6fb2192fe6ba2de0f1258c168f34382df63658359ee831bbda9f669db2e0499",
      target:
        "IP_e000e83fd5fc8045d04b96af43f55ceb1005ec6e728aba4b066eaa1b47b11789",
      linksNumId: [18, 102],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_8589a8b5ff68ea48a4fd2f3060f26f16b7de026f4aeab4fda0cf3778272e55b6",
      target:
        "IP_e000e83fd5fc8045d04b96af43f55ceb1005ec6e728aba4b066eaa1b47b11789",
      linksNumId: [7008, 102],
    },
    {
      relation: "r_asn",
      source:
        "IP_e000e83fd5fc8045d04b96af43f55ceb1005ec6e728aba4b066eaa1b47b11789",
      target:
        "ASN_f767fa23a48f6ac1e462cfdd6c56ddde1ba293cba073d161d0070265de46a9e9",
      linksNumId: [102, 7016],
    },
    {
      relation: "r_asn",
      source:
        "IP_e000e83fd5fc8045d04b96af43f55ceb1005ec6e728aba4b066eaa1b47b11789",
      target:
        "ASN_645c789aee7c2ee6923a919af4a10f6876f171e2c8e55fa05547184ea0eccc17",
      linksNumId: [102, 7031],
    },
    {
      relation: "r_asn",
      source:
        "IP_e000e83fd5fc8045d04b96af43f55ceb1005ec6e728aba4b066eaa1b47b11789",
      target:
        "ASN_71889ff77e767b6385c2e0c09548b2fa3754c01817eef98f7d761368b46dd247",
      linksNumId: [102, 7042],
    },
    {
      relation: "r_cidr",
      source:
        "IP_e000e83fd5fc8045d04b96af43f55ceb1005ec6e728aba4b066eaa1b47b11789",
      target:
        "IP_CIDR_2acbd77fe64c9bbdaf5d673491d44eaa54b07b4cf3f8ec078ba23134152ca198",
      linksNumId: [102, 7053],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_c6fb2192fe6ba2de0f1258c168f34382df63658359ee831bbda9f669db2e0499",
      target:
        "Domain_8589a8b5ff68ea48a4fd2f3060f26f16b7de026f4aeab4fda0cf3778272e55b6",
      linksNumId: [18, 7008],
    },
    {
      relation: "r_cert",
      source:
        "Domain_c6fb2192fe6ba2de0f1258c168f34382df63658359ee831bbda9f669db2e0499",
      target:
        "Cert_9ace6aae20e3ac6d9ebfae8938b91112460b27ad204cf11f1301f154c5d309a4",
      linksNumId: [18, 4],
    },
    {
      relation: "r_cert",
      source:
        "Domain_6f51b90ab3ab80b45407724da4f21428fc679ab578242223ba6be8020bd6b2c0",
      target:
        "Cert_9ace6aae20e3ac6d9ebfae8938b91112460b27ad204cf11f1301f154c5d309a4",
      linksNumId: [16, 4],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_8581808a73160e86a498bda75b9ce9343c6e9bdd4b96154e20cf4bc8e2252aba",
      target:
        "IP_cdcb3771d72a01e7845b212e74d1ca1b0e8384b79bad1da2f73c93959da5b3d2",
      linksNumId: [106, 112],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_de3adb45941c3a23ff435b114d511d5834f61fde8d2c887b5f0e0870a12626aa",
      target:
        "IP_cdcb3771d72a01e7845b212e74d1ca1b0e8384b79bad1da2f73c93959da5b3d2",
      linksNumId: [7038, 112],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_d947c1f5da6c207f2bf42ede259badc7b02c322d7ca6d0b3479d5fe2e68ac39b",
      target:
        "IP_cdcb3771d72a01e7845b212e74d1ca1b0e8384b79bad1da2f73c93959da5b3d2",
      linksNumId: [7050, 112],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_b06ca3ce4f6aa438c18b249af6fc462a2d676c19c8507275af53d8ac6addd724",
      target:
        "IP_cdcb3771d72a01e7845b212e74d1ca1b0e8384b79bad1da2f73c93959da5b3d2",
      linksNumId: [7060, 112],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_ba4e00c695b32914b3c2ac6e09dd9cc87740e8cb9789613bc4f6527a50746fae",
      target:
        "IP_cdcb3771d72a01e7845b212e74d1ca1b0e8384b79bad1da2f73c93959da5b3d2",
      linksNumId: [7073, 112],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_a14cafc1987f330396f30665b3917d01afdc455722009beb51e8e6fb6aeeaf3e",
      target:
        "IP_cdcb3771d72a01e7845b212e74d1ca1b0e8384b79bad1da2f73c93959da5b3d2",
      linksNumId: [7084, 112],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_71b99aab24ddfaf8e80847111b80bb30f377faf5dd8a0b00fe9d3cf4439ae364",
      target:
        "IP_cdcb3771d72a01e7845b212e74d1ca1b0e8384b79bad1da2f73c93959da5b3d2",
      linksNumId: [7095, 112],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_750574ff59f4e2c140ce0880a93de5848f2d2429df6830e3ea64489be8a2af41",
      target:
        "IP_cdcb3771d72a01e7845b212e74d1ca1b0e8384b79bad1da2f73c93959da5b3d2",
      linksNumId: [7108, 112],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_d802b7c03a6e9215bd81542d2d89be50ef38bfce8b351562737122742e56fab3",
      target:
        "IP_cdcb3771d72a01e7845b212e74d1ca1b0e8384b79bad1da2f73c93959da5b3d2",
      linksNumId: [7116, 112],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_57ce03f1cfd227cf143f0ac65db7319280f49dcdbaec13694d749131c4099be2",
      target:
        "IP_cdcb3771d72a01e7845b212e74d1ca1b0e8384b79bad1da2f73c93959da5b3d2",
      linksNumId: [7129, 112],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_e97a8adf8a1cc633b87142566850032689d90bb57064df14c3a59039973716cd",
      target:
        "IP_cdcb3771d72a01e7845b212e74d1ca1b0e8384b79bad1da2f73c93959da5b3d2",
      linksNumId: [7136, 112],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_a4b490c9d5133c645c9bf81090843564e7918d23c13d7d6308a7669f190e5bdd",
      target:
        "IP_cdcb3771d72a01e7845b212e74d1ca1b0e8384b79bad1da2f73c93959da5b3d2",
      linksNumId: [7149, 112],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_e0308e451fd2282007f0afa40d0619f738216191d1b83d4bdcb15ad40679410c",
      target:
        "IP_cdcb3771d72a01e7845b212e74d1ca1b0e8384b79bad1da2f73c93959da5b3d2",
      linksNumId: [7156, 112],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_e738b2e5204bd3079c9e41d513822e9235f8bc7d7b0faa674d813d5d808d0f8d",
      target:
        "IP_cdcb3771d72a01e7845b212e74d1ca1b0e8384b79bad1da2f73c93959da5b3d2",
      linksNumId: [7171, 112],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_a78a8f0c0f0e9c9e2b37736e02a25f9ce0577918cb7ea2fa74120c190274deb0",
      target:
        "IP_cdcb3771d72a01e7845b212e74d1ca1b0e8384b79bad1da2f73c93959da5b3d2",
      linksNumId: [7183, 112],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_60f3b873b0faae6399ad773e37edda51e6e92e347f93e991be885f60918d5a0a",
      target:
        "IP_cdcb3771d72a01e7845b212e74d1ca1b0e8384b79bad1da2f73c93959da5b3d2",
      linksNumId: [7193, 112],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_7d0f9dde5b58e09492732438ef89991901138ba65d60d3073f50865e042fe72f",
      target:
        "IP_cdcb3771d72a01e7845b212e74d1ca1b0e8384b79bad1da2f73c93959da5b3d2",
      linksNumId: [7202, 112],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_44292b69f3110c79d4f5e9ead11352edd3dc07e28dcc03d8ea3a02560ec7fc4b",
      target:
        "IP_cdcb3771d72a01e7845b212e74d1ca1b0e8384b79bad1da2f73c93959da5b3d2",
      linksNumId: [7218, 112],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_ce7f626cb6a0cb5b72474afb5e615a58114e635832c80d9eb1e683d649b613c7",
      target:
        "IP_cdcb3771d72a01e7845b212e74d1ca1b0e8384b79bad1da2f73c93959da5b3d2",
      linksNumId: [7228, 112],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_f69a4cdbff9f7ae4319dac4dbf4180b8fa7583d224b1b0d119fce12b10f57bff",
      target:
        "IP_cdcb3771d72a01e7845b212e74d1ca1b0e8384b79bad1da2f73c93959da5b3d2",
      linksNumId: [7242, 112],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_747dbfaee40207d56867f4a77143dac391ffa608e76df45d8399974bf9f88379",
      target:
        "IP_cdcb3771d72a01e7845b212e74d1ca1b0e8384b79bad1da2f73c93959da5b3d2",
      linksNumId: [7256, 112],
    },
    {
      relation: "r_dns_a",
      source:
        "Domain_ef9f829f3971fa9312dafd7adb3545270d6ae5d8a92947b555de3541eb33a0dd",
      target:
        "IP_cdcb3771d72a01e7845b212e74d1ca1b0e8384b79bad1da2f73c93959da5b3d2",
      linksNumId: [7265, 112],
    },
    {
      relation: "r_asn",
      source:
        "IP_cdcb3771d72a01e7845b212e74d1ca1b0e8384b79bad1da2f73c93959da5b3d2",
      target:
        "ASN_4eba77aac4cf89cf4d89ac512cebbaae9c589e31878d997f02bf320085cf07e0",
      linksNumId: [112, 3111],
    },
    {
      relation: "r_cidr",
      source:
        "IP_cdcb3771d72a01e7845b212e74d1ca1b0e8384b79bad1da2f73c93959da5b3d2",
      target:
        "IP_CIDR_fcea994eb27b24a055a3c02585f04811302aea02add7f2abbdac93fd89d22e7a",
      linksNumId: [112, 7048],
    },
    {
      relation: "r_cert",
      source:
        "Domain_8581808a73160e86a498bda75b9ce9343c6e9bdd4b96154e20cf4bc8e2252aba",
      target:
        "Cert_9032204fc475b809ea02a4ffc7e682660892d9e9d23b7b1777d0b4f0e9a0a656",
      linksNumId: [106, 101],
    },
    {
      relation: "r_cert",
      source:
        "Domain_bb9efa84372c2d54197d92b0a8d82dde5bb5473b38c6006f6d759b1324a0802a",
      target:
        "Cert_9032204fc475b809ea02a4ffc7e682660892d9e9d23b7b1777d0b4f0e9a0a656",
      linksNumId: [105, 101],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_bb9efa84372c2d54197d92b0a8d82dde5bb5473b38c6006f6d759b1324a0802a",
      target:
        "Domain_8581808a73160e86a498bda75b9ce9343c6e9bdd4b96154e20cf4bc8e2252aba",
      linksNumId: [105, 106],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_8581808a73160e86a498bda75b9ce9343c6e9bdd4b96154e20cf4bc8e2252aba",
      target:
        "Domain_bb9efa84372c2d54197d92b0a8d82dde5bb5473b38c6006f6d759b1324a0802a",
      linksNumId: [106, 105],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_8581808a73160e86a498bda75b9ce9343c6e9bdd4b96154e20cf4bc8e2252aba",
      target:
        "Domain_de3adb45941c3a23ff435b114d511d5834f61fde8d2c887b5f0e0870a12626aa",
      linksNumId: [106, 7038],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_8581808a73160e86a498bda75b9ce9343c6e9bdd4b96154e20cf4bc8e2252aba",
      target:
        "Domain_d947c1f5da6c207f2bf42ede259badc7b02c322d7ca6d0b3479d5fe2e68ac39b",
      linksNumId: [106, 7050],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_8581808a73160e86a498bda75b9ce9343c6e9bdd4b96154e20cf4bc8e2252aba",
      target:
        "Domain_b06ca3ce4f6aa438c18b249af6fc462a2d676c19c8507275af53d8ac6addd724",
      linksNumId: [106, 7060],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_8581808a73160e86a498bda75b9ce9343c6e9bdd4b96154e20cf4bc8e2252aba",
      target:
        "Domain_ba4e00c695b32914b3c2ac6e09dd9cc87740e8cb9789613bc4f6527a50746fae",
      linksNumId: [106, 7073],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_8581808a73160e86a498bda75b9ce9343c6e9bdd4b96154e20cf4bc8e2252aba",
      target:
        "Domain_a14cafc1987f330396f30665b3917d01afdc455722009beb51e8e6fb6aeeaf3e",
      linksNumId: [106, 7084],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_8581808a73160e86a498bda75b9ce9343c6e9bdd4b96154e20cf4bc8e2252aba",
      target:
        "Domain_71b99aab24ddfaf8e80847111b80bb30f377faf5dd8a0b00fe9d3cf4439ae364",
      linksNumId: [106, 7095],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_8581808a73160e86a498bda75b9ce9343c6e9bdd4b96154e20cf4bc8e2252aba",
      target:
        "Domain_750574ff59f4e2c140ce0880a93de5848f2d2429df6830e3ea64489be8a2af41",
      linksNumId: [106, 7108],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_8581808a73160e86a498bda75b9ce9343c6e9bdd4b96154e20cf4bc8e2252aba",
      target:
        "Domain_d802b7c03a6e9215bd81542d2d89be50ef38bfce8b351562737122742e56fab3",
      linksNumId: [106, 7116],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_8581808a73160e86a498bda75b9ce9343c6e9bdd4b96154e20cf4bc8e2252aba",
      target:
        "Domain_57ce03f1cfd227cf143f0ac65db7319280f49dcdbaec13694d749131c4099be2",
      linksNumId: [106, 7129],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_8581808a73160e86a498bda75b9ce9343c6e9bdd4b96154e20cf4bc8e2252aba",
      target:
        "Domain_e97a8adf8a1cc633b87142566850032689d90bb57064df14c3a59039973716cd",
      linksNumId: [106, 7136],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_8581808a73160e86a498bda75b9ce9343c6e9bdd4b96154e20cf4bc8e2252aba",
      target:
        "Domain_a4b490c9d5133c645c9bf81090843564e7918d23c13d7d6308a7669f190e5bdd",
      linksNumId: [106, 7149],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_8581808a73160e86a498bda75b9ce9343c6e9bdd4b96154e20cf4bc8e2252aba",
      target:
        "Domain_e0308e451fd2282007f0afa40d0619f738216191d1b83d4bdcb15ad40679410c",
      linksNumId: [106, 7156],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_8581808a73160e86a498bda75b9ce9343c6e9bdd4b96154e20cf4bc8e2252aba",
      target:
        "Domain_e738b2e5204bd3079c9e41d513822e9235f8bc7d7b0faa674d813d5d808d0f8d",
      linksNumId: [106, 7171],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_8581808a73160e86a498bda75b9ce9343c6e9bdd4b96154e20cf4bc8e2252aba",
      target:
        "Domain_a78a8f0c0f0e9c9e2b37736e02a25f9ce0577918cb7ea2fa74120c190274deb0",
      linksNumId: [106, 7183],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_8581808a73160e86a498bda75b9ce9343c6e9bdd4b96154e20cf4bc8e2252aba",
      target:
        "Domain_60f3b873b0faae6399ad773e37edda51e6e92e347f93e991be885f60918d5a0a",
      linksNumId: [106, 7193],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_8581808a73160e86a498bda75b9ce9343c6e9bdd4b96154e20cf4bc8e2252aba",
      target:
        "Domain_7d0f9dde5b58e09492732438ef89991901138ba65d60d3073f50865e042fe72f",
      linksNumId: [106, 7202],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_8581808a73160e86a498bda75b9ce9343c6e9bdd4b96154e20cf4bc8e2252aba",
      target:
        "Domain_44292b69f3110c79d4f5e9ead11352edd3dc07e28dcc03d8ea3a02560ec7fc4b",
      linksNumId: [106, 7218],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_8581808a73160e86a498bda75b9ce9343c6e9bdd4b96154e20cf4bc8e2252aba",
      target:
        "Domain_ce7f626cb6a0cb5b72474afb5e615a58114e635832c80d9eb1e683d649b613c7",
      linksNumId: [106, 7228],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_8581808a73160e86a498bda75b9ce9343c6e9bdd4b96154e20cf4bc8e2252aba",
      target:
        "Domain_f69a4cdbff9f7ae4319dac4dbf4180b8fa7583d224b1b0d119fce12b10f57bff",
      linksNumId: [106, 7242],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_8581808a73160e86a498bda75b9ce9343c6e9bdd4b96154e20cf4bc8e2252aba",
      target:
        "Domain_747dbfaee40207d56867f4a77143dac391ffa608e76df45d8399974bf9f88379",
      linksNumId: [106, 7256],
    },
    {
      relation: "r_subdomain",
      source:
        "Domain_8581808a73160e86a498bda75b9ce9343c6e9bdd4b96154e20cf4bc8e2252aba",
      target:
        "Domain_ef9f829f3971fa9312dafd7adb3545270d6ae5d8a92947b555de3541eb33a0dd",
      linksNumId: [106, 7265],
    },
  ],
};

var nodeTable, linkTable;
export default function DetailList({ w, h, divname, dataparam }) {
  const [nodeData, setNodeData] = useState([]);
  const [linkData, setLinkData] = useState([]);

  const [svgWidth, setSvgWidth] = useState(w);
  const [svgHeight, setSvgHeight] = useState(h);
  const [selectionNode, setSelectionNode] = useState([]);
  const [selectionLink, setSelectionLink] = useState([]);
  const [dataParam, setDataParam] = useState(dataparam);

  // 随系统缩放修改画布大小
  useEffect(() => {
    setSvgWidth(w);
  }, [w]);
  useEffect(() => {
    setSvgHeight(h);
  }, [h]);

  useEffect(() => {
    getDetialListSds(dataparam).then((res) => {
      setNodeData(res.nodes);
      setLinkData(res.links);
    });
  }, [dataparam]);

  useEffect(() => {
    PubSub.publish("tableToMainNodeDt", selectionNode);
  }, [selectionNode]);

  useEffect(() => {
    PubSub.publish("tableToMainLinkDt", selectionLink);
  }, [selectionLink]);

  useEffect(() => {
    const dimensions = {
      width: svgWidth,
      height: svgHeight,
      margin: { top: 20, right: 20, bottom: 20, left: 20 },
    };
    const boundedWidth =
      dimensions.width - dimensions.margin.left - dimensions.margin.right;
    const boundedHeight =
      dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

    d3.selectAll(`div#${divname} g`).remove();
    const g = d3
      .select(`#${divname}`)
      .append("g")
      .attr("width", boundedWidth)
      .attr("height", boundedHeight)
      .attr("viewBox", [0, 0, boundedWidth, boundedHeight])
      .style("max-width", "100%")
      .style("background", "#aaa")
      .style(
        "transform",
        `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
      );
    if (divname === "combine-table-dl-node") {
      g.append(() => {
        nodeTable = table(nodeData, {
          rows: Infinity,
          required: false,
          columns: nodeColumns,
          format: {
            r_cert_chain: sparkbar(d3.max(nodeData, (d) => d.r_cert_chain)),
            r_cert: sparkbar(d3.max(nodeData, (d) => d.r_cert)),
            r_whois_name: sparkbar(d3.max(nodeData, (d) => d.r_whois_name)),
            r_whois_phone: sparkbar(d3.max(nodeData, (d) => d.r_whois_phone)),
            r_whois_email: sparkbar(d3.max(nodeData, (d) => d.r_whois_email)),
            r_cname: sparkbar(d3.max(nodeData, (d) => d.r_cname)),
            r_request_jump: sparkbar(d3.max(nodeData, (d) => d.r_request_jump)),
            r_subdomain: sparkbar(d3.max(nodeData, (d) => d.r_subdomain)),
            r_dns_a: sparkbar(d3.max(nodeData, (d) => d.r_dns_a)),
            r_cidr: sparkbar(d3.max(nodeData, (d) => d.r_cidr)),
            r_asn: sparkbar(d3.max(nodeData, (d) => d.r_asn)),
            isCore: tfbar(),
          },
          maxWidth: svgWidth,
          maxHeight: svgHeight,
        });
        return nodeTable;
      });
      nodeTable.addEventListener("click", (event) => {
        // 增加元素
        if (event.target.nodeName === "INPUT" && event.target.checked) {
          let curNumId = parseInt(
            event.path[2].cells[1].innerHTML.replaceAll(",", "")
          ); // 将html的numId转换为int类型
          if (!isNaN(curNumId)) {
            setSelectionNode((selectionNode) =>
              Array.from(new Set([...selectionNode, curNumId]))
            );
          }
        }
        // 删除元素
        if (event.target.nodeName === "INPUT" && !event.target.checked) {
          let curNumId = parseInt(
            event.path[2].cells[1].innerHTML.replaceAll(",", "")
          );
          if (!isNaN(curNumId)) {
            setSelectionNode((selectionNode) =>
              selectionNode.filter((d) => d !== curNumId)
            );
          } else {
            setSelectionNode([]);
          }
        }
      });

      // 下载事件
      nodeTable.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        downloadRes('node');
      });
    } else if (divname === "combine-table-dl-link") {
      g.append(() => {
        linkTable = table(linkData, {
          rows: Infinity,
          required: false,
          columns: linkColumns,
          format: {
            isCore: tfbar(),
          },
          maxWidth: svgWidth,
          maxHeight: svgHeight,
        });
        return linkTable;
      });
      linkTable.addEventListener("click", (event) => {
        // 增加元素
        if (event.target.nodeName === "INPUT" && event.target.checked) {
          let curSource = event.path[2].cells[3].innerHTML;
          let curTarget = event.path[2].cells[4].innerHTML;
          let curPair = curSource + "-" + curTarget;
          if (curPair != "<span></span>source-<span></span>target") {
            setSelectionLink((selectionLink) =>
              Array.from(new Set([...selectionLink, curPair]))
            );
          }
        }
        // 删除元素
        if (event.target.nodeName === "INPUT" && !event.target.checked) {
          let curSource = event.path[2].cells[3].innerHTML;
          let curTarget = event.path[2].cells[4].innerHTML;
          let curPair = curSource + "-" + curTarget;
          if (curPair != "<span></span>source-<span></span>target") {
            setSelectionLink((selectionLink) =>
              selectionLink.filter((d) => d !== curPair)
            );
          } else {
            setSelectionLink([]);
          }
        }

        // 下载表格数据
        linkTable.addEventListener("contextmenu", (event) => {
          event.preventDefault();
          downloadRes('link');
        });
      });
    }
  }, [nodeData, linkData, svgWidth, svgHeight]);

  function tfbar() {
    // true/false的div，将true加粗
    return (x) => html`<div
      style="
      font-weight: ${x ? "bolder" : "normal"};
      width: "100%";
      >
      ${x.toLocaleString("en")}
    </div>`;
  }

  function downloadRes(type) {
    const tNodeHeader = "id,name,type,industry,isCore,";
    var nodeFilter = ["id", "name", "type", "industry", "isCore"];
    const tLinkHeader = "relation,source,target,isCore,";
    var linkFilter = ["relation", "source", "target", "isCore"];
    // 保存节点信息
    if(type === 'node'){
      let nodeCsvString = tNodeHeader;
      nodeCsvString += "\r\n";
      nodeData.forEach((item) => {
        nodeFilter.forEach((key) => {
          let value = item[key];
          if (key === "industry") {
            let valueArr = '"[' + value.split("").toString() + ']"';
            nodeCsvString += valueArr + ",";
          } else {
            nodeCsvString += value + ",";
          }
        });
        nodeCsvString += "\r\n";
      });
      nodeCsvString =
        "data:text/csv;charset=utf-8,\ufeff" + encodeURIComponent(nodeCsvString);
      let nodeLink = document.createElement("a");
      nodeLink.href = nodeCsvString;
      nodeLink.download = "节点.csv";
      document.body.appendChild(nodeLink);
      nodeLink.click();
      document.body.removeChild(nodeLink);
    }

    // 保存边的信息
    else if(type === 'link'){
      let linkCsvString = tLinkHeader;
      linkCsvString += "\r\n";
      linkData.forEach((item) => {
        linkFilter.forEach((key) => {
          let value = item[key];
          linkCsvString += value + ",";
        });
        linkCsvString += "\r\n";
      });
      linkCsvString =
        "data:text/csv;charset=utf-8,\ufeff" + encodeURIComponent(linkCsvString);
      let linkLink = document.createElement("a");
      linkLink.href = linkCsvString;
      linkLink.download = "边.csv";
      document.body.appendChild(linkLink);
      linkLink.click();
      document.body.removeChild(linkLink);
    }
  }

  function sparkbar(max) {
    // max为0时，设置为1，避免计算div宽度百分比时除以0
    if (max === 0) {
      max = 1;
    }
    max = Math.sqrt(max); // 平滑数据区间变化

    let colorScale = d3.scaleSequential([0, max], d3.interpolateBlues);
    return (x) => html`<div
      style="
      background: ${colorScale(Math.sqrt(x))};
      width: ${(100 * Math.sqrt(x)) / max}%;
      float: left;
      padding-left: 3px;
      box-sizing: border-box;
      overflow: visible;
      display: flex;
      justify-content: end;"
    >
      ${x.toLocaleString("en")}
    </div>`;
  }
  return <></>;
}
