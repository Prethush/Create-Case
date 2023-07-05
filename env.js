let arr = [
  { key: '["deploymentName"]', value: 'aviva-rfp-1' },
  { key: '["namespace"]', value: 'neutrinos-aviva-163dd85d-d1af-16cb' },
  { key: '["ingress"].enabled', value: true },
  { key: '["ingress"].ingressClass', value: 'nginx' },
  { key: '["ingress"].ingressPath', value: '/aviva-rfp-1/api/ping' },
  {
    key: '["ingress"].ingressHost',
    value: 'neutrinos-aviva-163dd85d-d1af-16cb.neutrinos.neutrinos-apps.com'
  },
  { key: '["limitRps"]', value: '5' },
  { key: '["serviceName"]', value: 'aviva-rfp-1-service' }
]

console.log(arr[0].value)