const Task = require("../models/TaskModel");
const {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} = require("../controllers/tasksController");

jest.mock("../models/TaskModel");

describe("Task API", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getTasks", () => {
    it("should return all tasks", async () => {
      const mockTasks = [
        { id: 1, title: "Task 1", completed: false },
        { id: 2, title: "Task 2", completed: true },
      ];
      Task.find.mockResolvedValue(mockTasks);

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await getTasks({}, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: mockTasks,
      });
    });

    it("should handle error and return error message", async () => {
      const errorMessage = "Some error message";
      Task.find.mockRejectedValue(new Error(errorMessage));

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await getTasks({}, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        error: errorMessage,
      });
    });
  });

  describe("createTask", () => {
    it("should create a new task", async () => {
      const mockTask = { id: 1, title: "New Task", completed: false };
      Task.create.mockResolvedValue(mockTask);

      const mockRequest = {
        body: { title: "New Task" },
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await createTask(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: mockTask,
      });
    });

    it("should handle error and return error message", async () => {
      const errorMessage = "Some error message";
      Task.create.mockRejectedValue(new Error(errorMessage));

      const mockRequest = {
        body: { title: "New Task" },
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await createTask(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        error: errorMessage,
      });
    });
  });

  describe("deleteTask", () => {
    it("should delete a task", async () => {
      const mockTask = { id: 1, title: "Task 1", completed: false };
      Task.findByIdAndDelete.mockResolvedValue(mockTask);

      const mockRequest = {
        params: { id: 1 },
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await deleteTask(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: mockTask,
      });
    });

    it("should handle task not found and return error message", async () => {
      Task.findByIdAndDelete.mockResolvedValue(null);

      const mockRequest = {
        params: { id: 1 },
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await deleteTask(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        error: "Task not found",
      });
    });

    it("should handle error and return error message", async () => {
      const errorMessage = "Some error message";
      Task.findByIdAndDelete.mockRejectedValue(new Error(errorMessage));

      const mockRequest = {
        params: { id: 1 },
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await deleteTask(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        error: errorMessage,
      });
    });
  });

  describe("updateTask", () => {
    it("should update a task", async () => {
      const mockTask = { id: 1, title: "Task 1", completed: true };
      Task.findByIdAndUpdate.mockResolvedValue(mockTask);

      const mockRequest = {
        params: { id: 1 },
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await updateTask(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: mockTask,
      });
    });

    it("should handle error and return error message", async () => {
      const errorMessage = "Some error message";
      Task.findByIdAndUpdate.mockRejectedValue(new Error(errorMessage));

      const mockRequest = {
        params: { id: 1 },
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await updateTask(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        error: errorMessage,
      });
    });
  });
});
