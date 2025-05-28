import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

type Option = {
  id: string;
  text: string;
  value: string;
};

type Question = {
  id: string;
  text: string;
  type: "single" | "multiple" | "text";
  required: boolean;
  options?: Option[];
  subQuestions?: Question[];
};

type QuestionGroup = {
  id: string;
  title: string;
  questions: Question[];
};

type Section = {
  id: string;
  title: string;
  description: string;
  questionGroups: QuestionGroup[];
};

const questionTypes = ["single", "multiple", "text"] as const;

export default function SurveyBuilder() {
  const [sections, setSections] = useState<Section[]>([]);

  const addSection = () => {
    setSections((prev) => [
      ...prev,
      {
        id: uuidv4(),
        title: "",
        description: "",
        questionGroups: [],
      },
    ]);
  };

  const updateSection = (
    id: string,
    field: keyof Omit<Section, "id" | "questionGroups">,
    value: string
  ) => {
    setSections((prev) =>
      prev.map((sec) => (sec.id === id ? { ...sec, [field]: value } : sec))
    );
  };

  const addQuestionGroup = (sectionId: string) => {
    setSections((prev) =>
      prev.map((sec) =>
        sec.id === sectionId
          ? {
              ...sec,
              questionGroups: [
                ...sec.questionGroups,
                {
                  id: uuidv4(),
                  title: "",
                  questions: [],
                },
              ],
            }
          : sec
      )
    );
  };

  const updateGroup = (
    sectionId: string,
    groupId: string,
    field: keyof Omit<QuestionGroup, "id" | "questions">,
    value: string
  ) => {
    setSections((prev) =>
      prev.map((sec) => {
        if (sec.id !== sectionId) return sec;
        return {
          ...sec,
          questionGroups: sec.questionGroups.map((grp) =>
            grp.id === groupId ? { ...grp, [field]: value } : grp
          ),
        };
      })
    );
  };

  const addQuestion = (sectionId: string, groupId: string) => {
    setSections((prev) =>
      prev.map((sec) => {
        if (sec.id !== sectionId) return sec;
        return {
          ...sec,
          questionGroups: sec.questionGroups.map((grp) =>
            grp.id === groupId
              ? {
                  ...grp,
                  questions: [
                    ...grp.questions,
                    {
                      id: uuidv4(),
                      text: "",
                      type: "text",
                      required: false,
                      options: [],
                      subQuestions: [],
                    },
                  ],
                }
              : grp
          ),
        };
      })
    );
  };

const updateQuestion = (
  sectionId: string,
  groupId: string,
  questionId: string,
  field: keyof Omit<Question, 'id' | 'options' | 'subQuestions'>,
  value: any
) => {
  // Helper recursive function to update question or subquestion
  const updateQuestionRecursively = (question: Question): Question => {
    if (question.id === questionId) {
      return { ...question, [field]: value };
    }
    if (question.subQuestions && question.subQuestions.length > 0) {
      return {
        ...question,
        subQuestions: question.subQuestions.map(updateQuestionRecursively),
      };
    }
    return question;
  };

  setSections(prev =>
    prev.map(sec => {
      if (sec.id !== sectionId) return sec;
      return {
        ...sec,
        questionGroups: sec.questionGroups.map(grp => {
          if (grp.id !== groupId) return grp;
          return {
            ...grp,
            questions: grp.questions.map(updateQuestionRecursively),
          };
        }),
      };
    })
  );
};


  // Add option to a question
  const addOption = (
    sectionId: string,
    groupId: string,
    questionId: string
  ) => {
    const newOption: Option = {
      id: uuidv4(),
      text: "",
      value: "",
    };

    setSections((prev) =>
      prev.map((sec) => {
        if (sec.id !== sectionId) return sec;
        return {
          ...sec,
          questionGroups: sec.questionGroups.map((grp) => {
            if (grp.id !== groupId) return grp;
            return {
              ...grp,
              questions: grp.questions.map((q) => {
                if (q.id !== questionId) return q;
                return {
                  ...q,
                  options: q.options ? [...q.options, newOption] : [newOption],
                };
              }),
            };
          }),
        };
      })
    );
  };

  // Update option text or value
  const updateOption = (
    sectionId: string,
    groupId: string,
    questionId: string,
    optionId: string,
    field: keyof Option,
    value: string
  ) => {
    setSections((prev) =>
      prev.map((sec) => {
        if (sec.id !== sectionId) return sec;
        return {
          ...sec,
          questionGroups: sec.questionGroups.map((grp) => {
            if (grp.id !== groupId) return grp;
            return {
              ...grp,
              questions: grp.questions.map((q) => {
                if (q.id !== questionId) return q;
                return {
                  ...q,
                  options: q.options?.map((opt) =>
                    opt.id === optionId ? { ...opt, [field]: value } : opt
                  ),
                };
              }),
            };
          }),
        };
      })
    );
  };

  // Add subquestion to a question
  const addSubQuestion = (
    sectionId: string,
    groupId: string,
    questionId: string
  ) => {
    const newSubQuestion: Question = {
      id: uuidv4(),
      text: "",
      type: "text",
      required: false,
      options: [],
      subQuestions: [],
    };

    setSections((prev) =>
      prev.map((sec) => {
        if (sec.id !== sectionId) return sec;
        return {
          ...sec,
          questionGroups: sec.questionGroups.map((grp) => {
            if (grp.id !== groupId) return grp;
            return {
              ...grp,
              questions: grp.questions.map((q) => {
                if (q.id !== questionId) return q;
                return {
                  ...q,
                  subQuestions: q.subQuestions
                    ? [...q.subQuestions, newSubQuestion]
                    : [newSubQuestion],
                };
              }),
            };
          }),
        };
      })
    );
  };

  // Render options input fields
  const renderOptions = (
    sectionId: string,
    groupId: string,
    question: Question
  ) => {
    if (!question.options) return null;
    return (
      <div className="pl-6 space-y-2">
        <strong className="block mb-1 text-gray-700 uppercase tracking-wide text-xs">
          Options
        </strong>
        {question.options.map((opt, i) => (
          <div key={opt.id} className="flex gap-3 items-center">
            <input
              type="text"
              placeholder={`Option ${i + 1} Text`}
              value={opt.text}
              onChange={(e) =>
                updateOption(
                  sectionId,
                  groupId,
                  question.id,
                  opt.id,
                  "text",
                  e.target.value
                )
              }
              className="flex-grow border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder={`Option ${i + 1} Value`}
              value={opt.value}
              onChange={(e) =>
                updateOption(
                  sectionId,
                  groupId,
                  question.id,
                  opt.id,
                  "value",
                  e.target.value
                )
              }
              className="flex-grow border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        <button
          onClick={() => addOption(sectionId, groupId, question.id)}
          className="mt-2 inline-flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white rounded-md px-3 py-1.5 text-sm font-semibold transition"
          title="Add Option"
          type="button"
        >
          ➕ Add Option
        </button>
      </div>
    );
  };

  const renderSubQuestions = (
    sectionId: string,
    groupId: string,
    question: Question
  ) => {
    if (!question.subQuestions || question.subQuestions.length === 0)
      return null;
    return (
      <div className="pl-6 border-l-4 border-gray-300 mt-4 space-y-4">
        <strong className="block mb-2 text-gray-700 uppercase tracking-wide text-sm">
          Subquestions
        </strong>
        {question.subQuestions.map((subQ, idx) => (
          <div
            key={subQ.id}
            className="bg-white shadow rounded-md p-4 space-y-3 border border-gray-200"
          >
            <input
              type="text"
              placeholder={`Subquestion ${idx + 1} Text`}
              value={subQ.text}
              onChange={(e) =>
                updateQuestion(
                  sectionId,
                  groupId,
                  subQ.id,
                  "text",
                  e.target.value
                )
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <select
              value={subQ.type}
              onChange={(e) =>
                updateQuestion(
                  sectionId,
                  groupId,
                  subQ.id,
                  "type",
                  e.target.value
                )
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {questionTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={subQ.required}
                onChange={(e) =>
                  updateQuestion(
                    sectionId,
                    groupId,
                    subQ.id,
                    "required",
                    e.target.checked
                  )
                }
                className="form-checkbox h-5 w-5 text-indigo-600"
              />
              <span className="text-gray-700 select-none font-medium">
                Required
              </span>
            </label>
            {renderOptions(sectionId, groupId, subQ)}
            {renderSubQuestions(sectionId, groupId, subQ)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="mx-auto p-6 space-y-8 bg-gray-50 min-h-screen font-sans">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-light">Survey Builder</h1>
        <button
          onClick={addSection}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md px-4 py-2 shadow transition"
          type="button"
          title="Add Section"
        >
          ➕ Add Section
        </button>
      </header>

      {sections.map((section) => (
        <section
          key={section.id}
          className="bg-white rounded-lg shadow-md p-6 space-y-5 border border-gray-200"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <input
              type="text"
              placeholder="Section Title"
              value={section.title}
              onChange={(e) =>
                updateSection(section.id, "title", e.target.value)
              }
              className="flex-grow border border-gray-300 rounded-md px-4 py-3 font-semibold text-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={() => addQuestionGroup(section.id)}
              className="whitespace-nowrap inline-flex items-center gap-1 bg-purple-600 hover:bg-purple-700 text-white rounded-md px-4 py-2 font-semibold shadow transition"
              type="button"
              title="Add Question Group"
            >
              📂 Add Question Group
            </button>
          </div>

          <textarea
            placeholder="Section Description"
            value={section.description}
            onChange={(e) =>
              updateSection(section.id, "description", e.target.value)
            }
            className="w-full border border-gray-300 rounded-md px-4 py-3 resize-none text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={3}
          />

          {section.questionGroups.length === 0 && (
            <p className="text-gray-500 italic">
              No question groups added yet.
            </p>
          )}

          {section.questionGroups.map((group) => (
            <div
              key={group.id}
              className="bg-gray-50 rounded-md border border-gray-300 p-5 space-y-4 shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <input
                  type="text"
                  placeholder="Question Group Title"
                  value={group.title}
                  onChange={(e) =>
                    updateGroup(section.id, group.id, "title", e.target.value)
                  }
                  className="flex-grow border border-gray-300 rounded-md px-3 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={() => addQuestion(section.id, group.id)}
                  className="inline-flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-4 py-2 font-semibold shadow transition"
                  type="button"
                  title="Add Question"
                >
                  ❓ Add Question
                </button>
              </div>

              {group.questions.length === 0 && (
                <p className="text-gray-500 italic">No questions added yet.</p>
              )}

              {/* {group.questions.map((q, i) => (
                <div
                  key={q.id}
                  className="bg-white rounded-md border border-gray-300 p-4 space-y-3 shadow-sm"
                >
                  <input
                    type="text"
                    placeholder={`Question ${i + 1} Text`}
                    value={q.text}
                    onChange={e => updateQuestion(section.id, group.id, q.id, 'text', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <select
                    value={q.type}
                    onChange={e => updateQuestion(section.id, group.id, q.id, 'type', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {questionTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>

                  <label className="inline-flex items-center gap-2 mt-1 text-gray-700 font-medium">
                    <input
                      type="checkbox"
                      checked={q.required}
                      onChange={e => updateQuestion(section.id, group.id, q.id, 'required', e.target.checked)}
                      className="form-checkbox h-5 w-5 text-indigo-600"
                    />
                    Required
                  </label>

                  {q.type !== 'text' && renderOptions(section.id, group.id, q)}
                  {renderSubQuestions(section.id, group.id, q)}
                </div>
              ))} */}

              {group.questions.map((q, i) => (
                <div
                  key={q.id}
                  className="bg-white rounded-md border border-gray-300 p-4 space-y-3 shadow-sm"
                >
                  <input
                    type="text"
                    placeholder={`Question ${i + 1} Text`}
                    value={q.text}
                    onChange={(e) =>
                      updateQuestion(
                        section.id,
                        group.id,
                        q.id,
                        "text",
                        e.target.value
                      )
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <select
                    value={q.type}
                    onChange={(e) =>
                      updateQuestion(
                        section.id,
                        group.id,
                        q.id,
                        "type",
                        e.target.value as "single" | "multiple" | "text"
                      )
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {questionTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={q.required}
                      onChange={(e) =>
                        updateQuestion(
                          section.id,
                          group.id,
                          q.id,
                          "required",
                          e.target.checked
                        )
                      }
                      className="form-checkbox h-5 w-5 text-indigo-600"
                    />
                    <span className="text-gray-700 select-none font-medium">
                      Required
                    </span>
                  </label>

                  {/* Render options only for single or multiple choice */}
                  {(q.type === "single" || q.type === "multiple") &&
                    renderOptions(section.id, group.id, q)}

                  {/* Button to add subquestions */}
                  <button
                    onClick={() => addSubQuestion(section.id, group.id, q.id)}
                    className="mt-2 inline-flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md px-3 py-1.5 text-sm font-semibold transition"
                    type="button"
                    title="Add Subquestion"
                  >
                    ➕ Add Subquestion
                  </button>

                  {/* Render nested subquestions */}
                  {renderSubQuestions(section.id, group.id, q)}
                </div>
              ))}
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
