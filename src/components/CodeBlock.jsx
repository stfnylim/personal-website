import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './CodeBlock.module.css';

/**
 * Props:
 *   code      — the code string
 *   language  — e.g. 'python', 'bash', 'javascript'
 *   caption   — optional label shown above the block
 */
export default function CodeBlock({ code, language = 'text', caption }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API not available
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.lang}>{language}</span>
        {caption && <span className={styles.caption}>{caption}</span>}
        <button
          className={styles.copyBtn}
          onClick={handleCopy}
          aria-label="Copy code"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: '0 0 var(--radius) var(--radius)',
          fontSize: '0.82rem',
          lineHeight: '1.6',
          background: '#1a1f2e',
        }}
        wrapLongLines
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
}
