type BufferGeometryComponent = import('three').Mesh<
  import('three').BufferGeometry,
  import('three').Material | import('three').Material[]
>;

type PlaneGeometryComponent = import('three').Mesh<
  import('three').PlaneGeometry,
  import('three').ShaderMaterial
>;
