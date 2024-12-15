import { useState, useRef } from "react";
import { jsPDF } from "jspdf";
import { Volume2, Pause, Download, ThumbsUp, ThumbsDown } from "lucide-react";

export default function CallAnalysis() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const [activeTab, setActiveTab] = useState("transcription");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Mock Data
  const mockData = {
    date: "2023-06-01",
    duration: "5:23",
    sentiment: "Позитивный",
    operator: "Иван Иванов",
    client: "Петр Петров",
    badWords: 0,
    resolved: true,
    emotionalMoments: [
      { time: "1:23", description: "Повышение голоса клиента" },
      { time: "3:45", description: "Успокоение клиента оператором" },
    ],
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setAudioURL(fileURL);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("audio", selectedFile);

    try {
      const response = await fetch("http://localhost:8000/analyze_audio/", {
        method: "POST",
        body: formData,
        headers: { "X-CSRFToken": getCSRFToken() },
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to analyze audio.");

      const data = await response.json();
      setAnalysisResult(data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setAnalysisResult(null);
    }
  };

  const getCSRFToken = () => {
    const csrfToken = document.cookie.split(";").find((cookie) => cookie.trim().startsWith("csrftoken="));
    return csrfToken ? csrfToken.split("=")[1] : "";
  };

  const renderTranscription = () => (
    <div>
      {analysisResult ? (
        <div className="mb-4 p-3 bg-white rounded-lg shadow">
          <span className="font-bold">Текст: </span>
          {analysisResult.original_text}
        </div>
      ) : (
        <p>Загрузите файл, чтобы увидеть транскрипцию.</p>
      )}
    </div>
  );

  const renderToneAnalysis = () => {
    if (!analysisResult) return <p>Загрузите файл, чтобы увидеть анализ тональности.</p>;

    const emojiMap = {
      anger: "😡",
      joy: "😊",
      fear: "😨",
      sadness: "😢",
      surprise: "😲",
      calm: "😌",
      neutral: "😐",
    };

    const sentimentEmoji = emojiMap[analysisResult.confidence_class] || "😐";

    return (
      <div className="mb-4 p-3 bg-white rounded-lg shadow">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold">{analysisResult.original_text}</span>
          <span>{sentimentEmoji} {(analysisResult.confidence * 100).toFixed(2)}%</span>
        </div>
        <div>
          <span className="font-bold">Эмоция: </span> {analysisResult.emotion}
        </div>
        <div className="mt-2">
          <div className="bg-gray-200 rounded-full h-2.5">
            <div
              style={{ width: `${(analysisResult.confidence * 100).toFixed(2)}%` }}
              className="h-2.5 rounded-full bg-blue-500"
            ></div>
          </div>
        </div>
      </div>
    );
  };

  const toggleAudioPlayback = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const downloadPDF = () => {
    if (!analysisResult) {
      alert("No analysis data available to download.");
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Call Analysis Report", 20, 20);

    doc.setFontSize(14);
    doc.text("Transcription:", 20, 40);
    doc.setFontSize(12);
    doc.text(analysisResult.original_text, 20, 50, { maxWidth: 170 });

    doc.setFontSize(14);
    doc.text("Emotion Analysis:", 20, 80);
    doc.setFontSize(12);
    doc.text(`Emotion: ${analysisResult.emotion}`, 20, 90);
    doc.text(`Confidence: ${(analysisResult.confidence * 100).toFixed(2)}%`, 20, 100);
    doc.text(`Text Emotion: ${analysisResult.text_emotion}`, 20, 110);
    doc.text(`Acoustic Emotion: ${analysisResult.acoustic_emotion}`, 20, 120);

    doc.save("call_analysis_report.pdf");
  };

  return (
    <main className="flex-1 p-6 bg-gray-100">
      <h1 className="text-3xl font-semibold mb-6">Анализ звонка</h1>

      {/* Mock Data Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Основная информация</h2>
          <p><strong>Дата:</strong> {mockData.date}</p>
          <p><strong>Длительность:</strong> {mockData.duration}</p>
          <p>
            <strong>Общая тональность:</strong>
            {mockData.sentiment === "Позитивный" && <ThumbsUp className="inline ml-2 text-green-500" />}
            {mockData.sentiment === "Негативный" && <ThumbsDown className="inline ml-2 text-red-500" />}
            {mockData.sentiment === "Нейтральный" && <span className="ml-2">-</span>}
          </p>
          <p><strong>Оператор:</strong> {mockData.operator}</p>
          <p><strong>Клиент:</strong> {mockData.client}</p>
          <p><strong>Количество плохих слов:</strong> {mockData.badWords}</p>
          <p><strong>Проблема решена:</strong> {mockData.resolved ? "Да" : "Нет"}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Эмоциональные моменты</h2>
          {mockData.emotionalMoments.map((moment, index) => (
            <div key={index} className="mb-2">
              <span className="inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded mr-2">{moment.time}</span>
              <span>{moment.description}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Audio Upload and Analysis */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4"
          accept="audio/*"
        />
        <button onClick={handleFileUpload} className="px-4 py-2 bg-blue-500 text-white rounded">
          Загрузить и анализировать аудио
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {/* Analysis Tabs */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="font-semibold text-lg mb-2">Анализ разговора</h2>

        <div className="flex mb-4 space-x-4">
          <button
            onClick={() => setActiveTab("transcription")}
            className={`px-4 py-2 ${activeTab === "transcription" ? "border-b-2 border-blue-500 font-semibold" : "text-gray-500"}`}
          >
            Транскрипция
          </button>
          <button
            onClick={() => setActiveTab("toneAnalysis")}
            className={`px-4 py-2 ${activeTab === "toneAnalysis" ? "border-b-2 border-blue-500 font-semibold" : "text-gray-500"}`}
          >
            Анализ тональности
          </button>
        </div>

        <div>
          {activeTab === "transcription" && renderTranscription()}
          {activeTab === "toneAnalysis" && renderToneAnalysis()}
        </div>
      </div>

      {/* Audio Playback and PDF Download */}
      <div className="flex items-center gap-4 mt-6">
        <button onClick={toggleAudioPlayback} className="flex items-center bg-blue-500 text-white rounded px-4 py-2">
          {isPlaying ? <><Pause className="mr-2 h-4 w-4" /> Пауза</> : <><Volume2 className="mr-2 h-4 w-4" /> Воспроизвести</>}
        </button>
        {audioURL && (
          <audio ref={audioRef} src={audioURL} onEnded={handleAudioEnded} />
        )}
        <button onClick={downloadPDF} className="flex items-center bg-gray-200 text-black rounded px-4 py-2">
          <Download className="mr-2 h-4 w-4" /> Скачать отчет
        </button>
      </div>
    </main>
  );
}
