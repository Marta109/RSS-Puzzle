export function showTranslationHint(hintText: string, isHintText: boolean) {
  let hint = document.querySelector<HTMLElement>('.hint');
  if (hint) {
    hint.textContent = hintText;
    if (isHintText) {
      isHintText = false;
      hint.style.display = 'none';
    } else {
      isHintText = true;
      hint.style.display = 'inline-block';
    }
  }

  return isHintText;
}

export function showAudioHint(isHintAudio: boolean) {
  const audio = document.querySelector<HTMLButtonElement>('#audio-hint');
  if (audio) {
    if (isHintAudio) {
      isHintAudio = false;
      audio.classList.add('audioBtnShow');
    } else {
      isHintAudio = true;
      audio.classList.remove('audioBtnShow');
    }
  }
  return isHintAudio;
}

export function audioHint(audioUrl: string) {
  const audio = document.querySelector<HTMLAudioElement>('#audio');

  if (audio) {
    const audioHintBtnIcon = document.querySelector('#audioHintBtnIcon');
    audio.src = `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/${audioUrl}`;
    audio.addEventListener('loadeddata', () => {
      audio.play();
      audioHintBtnIcon?.classList.add('fa-solid', 'fa-volume-high');
    });
    audio.addEventListener('ended', () => {
      audioHintBtnIcon?.classList.remove('fa-solid', 'fa-volume-high');
    });
  }
}
