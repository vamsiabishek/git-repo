import styles from './LanguageFilter.module.css'
import { languages } from '../../../constants/Common'

interface Props {
  selectedLanguage?: string;
  onSelect: (lang: string) => void;
}

export default function LanguageFilter({onSelect, selectedLanguage = 'all'}: Props) {
  return(
    <div>
       <select data-testid='language-filter' className={styles.languageDropdown} value={selectedLanguage} onChange={(e) => onSelect(e.target.value)}>
          <option value="all" data-testid='language-option'>All languages</option>
          {languages.map(lang => <option value={lang} key={`language-filter-${lang}`} data-testid='language-option'>{lang}</option>)}
        </select>
    </div>
  )
}