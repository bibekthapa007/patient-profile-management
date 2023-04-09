export const checkMimeType = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { target } = event;

  const files = target.files as FileList;
  const err = [];
  let val = true;
  const types = ['image/png', 'image/jpeg', 'image/gif'];

  for (var x = 0; x < files.length; x++) {
    if (types.every((type) => files[x].type !== type)) {
      err[x] = `${files[x].type} is not a supported format\n`;
      val = false;
    }
  }

  for (let z = 0; z < err.length; z++) {
    console.log(err[z]);
    // bootbox.alert(err[z]);
    target.value = '';
  }
  return val;
};
export const maxSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { target } = event;
  const files = target.files as FileList;

  if (files.length > 3) {
    const msg = 'Only 3 images can be uploaded at a time';
    target.value = '';
    console.log(msg);

    // bootbox.alert(msg);
    return false;
  }
  return true;
};
export const checkFileSize = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { target } = event;
  const files = target.files as FileList;
  const size = 2000000;

  const err = [];

  for (let x = 0; x < files.length; x++) {
    if (files[x].size > size) {
      err[x] = `${files[x].type}is too large, please pick a smaller file\n`;
    }
  }

  for (let z = 0; z < err.length; z++) {
    console.log(err[z]);
    // bootbox.alert(err[z]);
    target.value = '';
  }

  return true;
};

export const getVaccineLink = (link: string) => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  if (!link) {
    return '/images/profile.png';
  }

  if (link.startsWith('https://')) {
    return link;
  }

  if (link.startsWith('data:image')) {
    return link;
  }

  return `${serverUrl}/${link}`;
};
