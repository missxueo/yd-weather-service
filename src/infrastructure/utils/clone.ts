
export function fastyClone<TObject extends object>(data: TObject, ...exclusion: (string & keyof TObject)[]): TObject{
  const carbon = Object.assign({}, data);
  for (const exclued of exclusion) {
    if(carbon.hasOwnProperty(exclued)){
      delete carbon[exclued];
    }
  }
  return carbon;
}
