import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../components/Mapcompo.js'), {
  ssr: false
});

export default Map;